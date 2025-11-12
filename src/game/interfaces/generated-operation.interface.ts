import { OperationType } from "../enums/operation-type.enum";

export interface GeneratedExercise {
  operation: OperationType,
  num1: number,
  num2: number,
  result: number,
  remainder: number | null
}