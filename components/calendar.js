import DatePicker from 'react-datepicker'
import es from 'date-fns/locale/es'
import "react-datepicker/dist/react-datepicker.css";

export default function CustomCalendar({ selectedDate, onChange, isClearable = false, showPopperArrow = false, ...props }){
    return (
        <>
            <DatePicker 
            selected={selectedDate}
            onChange={onChange}
            isClearable={isClearable}
            showPopperArrow={showPopperArrow}
            timeInputLabel="Hora:"
            dateFormat="dd/MM/yyyy h:mm aa"
            showTimeInput
            locale={es}
            className="react-datapicker__input-text"//input is white by default and there is no already defined class for it so I created a new one
            {...props} />
        </>
    )
}