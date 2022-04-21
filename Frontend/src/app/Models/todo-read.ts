import { FlagRead } from './flag-read';
import { StatusRead } from './status-read';

export class TodoRead {
  constructor(
    public id: Number,
    public title: String,
    public status: StatusRead,
    public flag: FlagRead,
    public comments: String
  ) {}
}
