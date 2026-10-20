import React from 'react';
import { EyeExercise, EyeExerciseProps } from './EyeExercise.tsx';

export type EyeCheckReminderProps = EyeExerciseProps;
export const EyeCheckReminder: React.FC<EyeCheckReminderProps> = (props) => {
  return <EyeExercise {...props} />;
};

export { EyeExercise };
export default EyeCheckReminder;
