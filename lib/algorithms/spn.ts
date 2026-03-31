import type { Process, SchedulingResult, GanttItem } from "../types"

export function spnScheduling(processes: Process[], isPreemptive = false): SchedulingResult {
  if (isPreemptive) {
    // Preemptive SJF (Shortest Remaining Time First)
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

      // In preemptive SJF (SRTN), we always pick the one with shortest remaining time
      // Combine current process and ready queue to find the absolute shortest
      const candidates = [...readyQueue]
      if (currentProcess) candidates.push(currentProcess)

      const nextProcess = candidates.reduce((shortest, current) =>
        current.remainingTime! < shortest.remainingTime! ? current : shortest,
      )

      // If nextProcess is different from currentProcess, we preempt
      if (currentProcess && nextProcess.id !== currentProcess.id) {
        readyQueue.push(currentProcess)
        currentProcess = nextProcess
        readyQueue.splice(readyQueue.indexOf(nextProcess), 1)
      } else if (!currentProcess) {
        currentProcess = nextProcess
        readyQueue.splice(readyQueue.indexOf(nextProcess), 1)
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

  // Non-preemptive SJF (original implementation)
  const remainingProcesses = [...processes].map((p) => ({ ...p }))
  const ganttChart: GanttItem[] = []
  const results: Process[] = []
  let currentTime = 0

  while (remainingProcesses.length > 0) {
    // Get all processes that have arrived by current time
    const availableProcesses = remainingProcesses.filter((p) => p.arrivalTime <= currentTime)

    if (availableProcesses.length === 0) {
      // No process available, jump to next arrival time
      const nextArrival = Math.min(...remainingProcesses.map((p) => p.arrivalTime))
      ganttChart.push({
        processId: "IDLE",
        startTime: currentTime,
        endTime: nextArrival,
        isIdle: true,
      })
      currentTime = nextArrival
      continue
    }

    // Select process with shortest burst time
    const selectedProcess = availableProcesses.reduce((shortest, current) =>
      current.burstTime < shortest.burstTime ? current : shortest,
    )

    // Remove selected process from remaining processes
    const processIndex = remainingProcesses.findIndex((p) => p.id === selectedProcess.id)
    remainingProcesses.splice(processIndex, 1)

    // Execute the process
    selectedProcess.startTime = currentTime
    selectedProcess.responseTime = currentTime - selectedProcess.arrivalTime

    ganttChart.push({
      processId: selectedProcess.id,
      startTime: currentTime,
      endTime: currentTime + selectedProcess.burstTime,
    })

    currentTime += selectedProcess.burstTime
    selectedProcess.completionTime = currentTime
    selectedProcess.turnaroundTime = selectedProcess.completionTime - selectedProcess.arrivalTime
    selectedProcess.waitingTime = selectedProcess.turnaroundTime - selectedProcess.burstTime

    results.push(selectedProcess)
  }

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
