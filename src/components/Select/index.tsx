import { Role } from "../../interface"

const Select = ({ role, cb }: { role: Role, cb: (role: Role) => void }) => {

  const handle = (e: any) => {
    cb(e.target.value)
  }
  return (
    <select
      defaultValue={role}
      onChange={handle}
      style={{ marginRight: 5 }}
    >
      <option value='red'>Red</option>
      <option value='mafia'>Mafia</option>
      <option value='don'>Don</option>
      <option value='sherif'>Sherif</option>
    </select>
  )
}

export default Select