import type {
  Process,
  SchedulingResult,
  SchedulingAlgorithm,
  AlgorithmConfig,
} from "./types"
import { fcfsScheduling } from "./algorithms/fcfs"
import { roundRobinScheduling } from "./algorithms/round-robin"
import { spnScheduling } from "./algorithms/spn"
// Removed SRT/FB/FBV from exported algorithms
import { priorityScheduling } from "./algorithms/priority"

export function runSchedulingAlgorithm(
  algorithm: SchedulingAlgorithm,
  processes: Process[],
  config: AlgorithmConfig = {},
): SchedulingResult {
  switch (algorithm) {
    case "FCFS":
      return fcfsScheduling(processes, config.isPreemptive || false)

    case "RR":
      return roundRobinScheduling(processes, config.timeQuantum || 2, config.isPreemptive !== false)

    case "SJF":
      return spnScheduling(processes, config.isPreemptive || false)

    case "PRIORITY":
      return priorityScheduling(processes, config.isPreemptive || false, config.priorityHighIsMin !== false)

    default:
      throw new Error(`Unknown scheduling algorithm: ${algorithm}`)
  }
}

export const algorithmNames: Record<SchedulingAlgorithm, string> = {
  FCFS: "First Come First Serve",
  RR: "Round Robin",
  SJF: "Shortest Job First",
  PRIORITY: "Priority Scheduling",
}

export const algorithmDescriptions: Record<SchedulingAlgorithm, string> = {
  FCFS: "Processes jobs in order of arrival (configurable preemptive)",
  RR: "Fixed time quantum for fair CPU sharing (configurable preemptive)",
  SJF: "Selects the shortest job first (configurable preemptive)",
  PRIORITY: "Schedules based on priority; choose min or max as highest",
}

