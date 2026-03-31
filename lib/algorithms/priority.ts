import type { Process, SchedulingResult, GanttItem } from "../types"

export function priorityScheduling(
  processes: Process[],
  isPreemptive = false,
  priorityHighIsMin: boolean = true
): SchedulingResult {
    const processQueue = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime)
    const results: Process[] = processes.map((p) => ({
      ...p,
      remainingTime: p.burstTime,
      responseTime: -1,
    }))
    const readyQueue: Process[] = []
    const ganttChart: GanttItem[] = []

    let currentTime = 0
    let processIndex = 0
    let currentProcess: Process | null = null

    while (processIndex < processQueue.length || readyQueue.length > 0 || currentProcess !== null) {
      // Add all processes that have just arrived to ready queue
      while (processIndex < processQueue.length && processQueue[processIndex].arrivalTime <= currentTime) {
        const p = results.find((res) => res.id === processQueue[processIndex].id)!
        readyQueue.push(p)
        processIndex++
      }

      if (!currentProcess && readyQueue.length === 0) {
        // CPU is idle, jump to next arrival
        if (processIndex < processQueue.length) {
          const nextArrival = processQueue[processIndex].arrivalTime
          ganttChart.push({
            processId: "IDLE",
            startTime: currentTime,
            endTime: nextArrival,
            isIdle: true,
          })
          currentTime = nextArrival
          continue
        } else {
          break
        }
      }

      // Find the best process in (readyQueue + currentProcess)
      const candidates = [...readyQueue]
      if (currentProcess) candidates.push(currentProcess)

      const nextProcess = candidates.reduce((best, current) => {
        if (current.priority == null || best.priority == null) return best
        // If priorities are equal, FCFS (earlier arrival)
        if (current.priority === best.priority) {
          return current.arrivalTime < best.arrivalTime ? current : best
        }
        return priorityHighIsMin
          ? (current.priority < best.priority ? current : best)
          : (current.priority > best.priority ? current : best)
      })

      // Decision to change process (Preemption or new start)
      if (!currentProcess) {
        // Just pick the best one
        currentProcess = nextProcess
        readyQueue.splice(readyQueue.indexOf(currentProcess), 1)
      } else if (isPreemptive && nextProcess.id !== currentProcess.id) {
        // Preempt current process
        readyQueue.push(currentProcess)
        currentProcess = nextProcess
        readyQueue.splice(readyQueue.indexOf(currentProcess), 1)
      }

      // Start or continue execution
      if (currentProcess.responseTime === -1) {
        currentProcess.responseTime = currentTime - currentProcess.arrivalTime
      }

      ganttChart.push({
        processId: currentProcess.id,
        startTime: currentTime,
        endTime: currentTime + 1,
      })

      currentTime += 1
      currentProcess.remainingTime! -= 1

      if (currentProcess.remainingTime === 0) {
        currentProcess.completionTime = currentTime
        currentProcess.turnaroundTime = currentProcess.completionTime - currentProcess.arrivalTime
        currentProcess.waitingTime = currentProcess.turnaroundTime - currentProcess.burstTime
        currentProcess = null
      }
    }

    // Merge consecutive Gantt chart entries for the same process
    const mergedGanttChart: GanttItem[] = []
    for (const item of ganttChart) {
      const lastItem = mergedGanttChart[mergedGanttChart.length - 1]
      if (lastItem && lastItem.processId === item.processId && lastItem.endTime === item.startTime) {
        lastItem.endTime = item.endTime
      } else {
        mergedGanttChart.push(item)
      }
    }

    const averageWaitingTime = results.reduce((sum, p) => sum + (p.waitingTime || 0), 0) / results.length
    const averageTurnaroundTime = results.reduce((sum, p) => sum + (p.turnaroundTime || 0), 0) / results.length
    const averageResponseTime = results.reduce((sum, p) => sum + (p.responseTime || 0), 0) / results.length

    return {
      processes: results,
      ganttChart: mergedGanttChart,
      averageWaitingTime,
      averageTurnaroundTime,
      averageResponseTime,
      totalTime: currentTime,
    }
}
