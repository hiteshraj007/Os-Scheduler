import type { Process, SchedulingResult, GanttItem } from "../types"

export function fcfsScheduling(processes: Process[], isPreemptive = false): SchedulingResult {
  if (isPreemptive) {
    // Preemptive FCFS - processes can be interrupted by newly arrived processes
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
      // Add all processes that have recently arrived to ready queue
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

      // If no process is running, pick from ready queue
      if (!currentProcess && readyQueue.length > 0) {
        // FCFS selects earliest arriver
        readyQueue.sort((a, b) => a.arrivalTime - b.arrivalTime)
        currentProcess = readyQueue.shift()!
      }

      // Start or continue execution
      if (currentProcess) {
        if (currentProcess.responseTime === -1) {
          currentProcess.responseTime = currentTime - currentProcess.arrivalTime
        }

        const start = currentTime
        const end = currentTime + 1
        
        ganttChart.push({
          processId: currentProcess.id,
          startTime: start,
          endTime: end,
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

  // Non-preemptive FCFS (original implementation)
  const sortedProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime)
  const ganttChart: GanttItem[] = []
  let currentTime = 0

  const results = sortedProcesses.map((process) => {
    const processResult = { ...process }

    // If current time is less than arrival time, add idle time
    if (currentTime < process.arrivalTime) {
      if (currentTime < process.arrivalTime) {
        ganttChart.push({
          processId: "IDLE",
          startTime: currentTime,
          endTime: process.arrivalTime,
          isIdle: true,
        })
      }
      currentTime = process.arrivalTime
    }

    processResult.startTime = currentTime
    processResult.responseTime = currentTime - process.arrivalTime

    ganttChart.push({
      processId: process.id,
      startTime: currentTime,
      endTime: currentTime + process.burstTime,
    })

    currentTime += process.burstTime
    processResult.completionTime = currentTime
    processResult.turnaroundTime = processResult.completionTime - process.arrivalTime
    processResult.waitingTime = processResult.turnaroundTime - process.burstTime

    return processResult
  })

  const averageWaitingTime = results.reduce((sum, p) => sum + (p.waitingTime || 0), 0) / results.length
  const averageTurnaroundTime = results.reduce((sum, p) => sum + (p.turnaroundTime || 0), 0) / results.length
  const averageResponseTime = results.reduce((sum, p) => sum + (p.responseTime || 0), 0) / results.length

  return {
    processes: results,
    ganttChart,
    averageWaitingTime,
    averageTurnaroundTime,
    averageResponseTime,
    totalTime: currentTime,
  }
}
