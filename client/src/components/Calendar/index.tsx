import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

const localizer = momentLocalizer(moment)

const CustomCalendar = (props:Object) => (
  <div>
    <Calendar
      localizer={localizer}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  </div>
)

export default CustomCalendar