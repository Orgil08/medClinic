export interface EyeExerciseState {
  secondsLeft: number;
  isRunning: boolean;
  mode: 'work' | 'rest';
  targetEndTime: number | null; // epoch timestamp in ms
  soundEnabled: boolean;
  demoMode: boolean;
  lastUpdated: number;
}

export const WORK_SECONDS = 20 * 60; // 1200s (20 minutes)
export const REST_SECONDS = 20; // 20s
export const DEMO_WORK_SECONDS = 10; // 10s for fast verification
export const STORAGE_KEY = 'solongo_eye_exercise_state_v1';

/**
 * Formats seconds into mm:ss display
 */
export function formatTimer(totalSeconds: number): string {
  if (totalSeconds < 0) totalSeconds = 0;
  const mins = Math.floor(totalSeconds / 60);
  const secs = Math.floor(totalSeconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Calculates current progress percentage (0 - 100)
 */
export function calculateProgress(secondsLeft: number, totalDuration: number): number {
  if (totalDuration <= 0) return 0;
  const elapsed = totalDuration - secondsLeft;
  const pct = (elapsed / totalDuration) * 100;
  return Math.max(0, Math.min(100, Math.round(pct * 10) / 10));
}

/**
 * Determines remaining seconds from target end timestamp
 */
export function calculateRemainingFromTarget(targetEndTime: number | null): number {
  if (!targetEndTime) return 0;
  const diffMs = targetEndTime - Date.now();
  if (diffMs <= 0) return 0;
  return Math.ceil(diffMs / 1000);
}

/**
 * Determines the next state when countdown reaches zero
 */
export function getNextCycleState(
  currentMode: 'work' | 'rest',
  demoMode: boolean
): { nextMode: 'work' | 'rest'; nextSeconds: number } {
  if (currentMode === 'work') {
    return {
      nextMode: 'rest',
      nextSeconds: REST_SECONDS,
    };
  } else {
    return {
      nextMode: 'work',
      nextSeconds: demoMode ? DEMO_WORK_SECONDS : WORK_SECONDS,
    };
  }
}

/**
 * Loads preserved state from localStorage or falls back to default
 */
export function loadPersistedState(): EyeExerciseState {
  const defaultState: EyeExerciseState = {
    secondsLeft: WORK_SECONDS,
    isRunning: false,
    mode: 'work',
    targetEndTime: null,
    soundEnabled: true,
    demoMode: false,
    lastUpdated: Date.now(),
  };

  if (typeof window === 'undefined' || !window.localStorage) {
    return defaultState;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw) as Partial<EyeExerciseState>;

    // If it was running when unmounted, check how much time has passed
    if (parsed.isRunning && parsed.targetEndTime) {
      const remaining = calculateRemainingFromTarget(parsed.targetEndTime);
      if (remaining > 0) {
        return {
          secondsLeft: remaining,
          isRunning: true,
          mode: parsed.mode ?? 'work',
          targetEndTime: parsed.targetEndTime,
          soundEnabled: parsed.soundEnabled ?? true,
          demoMode: !!parsed.demoMode,
          lastUpdated: Date.now(),
        };
      } else {
        // Time expired while user was on another page / unmounted
        const next = getNextCycleState(parsed.mode ?? 'work', !!parsed.demoMode);
        return {
          secondsLeft: next.nextSeconds,
          isRunning: false,
          mode: next.nextMode,
          targetEndTime: null,
          soundEnabled: parsed.soundEnabled ?? true,
          demoMode: !!parsed.demoMode,
          lastUpdated: Date.now(),
        };
      }
    }

    return {
      secondsLeft: typeof parsed.secondsLeft === 'number' ? parsed.secondsLeft : WORK_SECONDS,
      isRunning: false,
      mode: parsed.mode ?? 'work',
      targetEndTime: null,
      soundEnabled: parsed.soundEnabled ?? true,
      demoMode: !!parsed.demoMode,
      lastUpdated: Date.now(),
    };
  } catch {
    return defaultState;
  }
}

/**
 * Saves state to localStorage
 */
export function persistState(state: EyeExerciseState): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore quota or disabled localStorage errors
  }
}

/**
 * Clears preserved state from localStorage
 */
export function clearPersistedState(): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore error
  }
}
