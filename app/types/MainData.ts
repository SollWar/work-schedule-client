import { Workplace } from './Workplace'
import { Worker } from './Worker'

export interface MainData {
  user: Worker
  availableWorkers: Worker[]
  availableWorkplaces: Workplace[]
}
