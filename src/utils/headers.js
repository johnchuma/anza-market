import { getUser } from "./local_storage"
export const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getUser() && getUser().ACCESS_TOKEN}`
  }