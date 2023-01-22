import { Bar, Button, Dialog, Title, TextArea, StepInput, ComboBox, ComboBoxItem, Label, } from "@ui5/webcomponents-react";
import { getDate } from "../utilities/utilities";
import { useContext } from "react";
import { ApplicationContext } from "../context/ApplicationContext";
import { dataTicket } from "../../dataTicket";
import '../App.css'

export default function DialogRegistrar({ estado }) {

    const appctx = useContext(ApplicationContext)

    document.onkeydown = function (evt) {
        evt = evt || window.event;
        if (evt.keyCode == 27) {
            appctx.setDataContext({ dialogRegistrar: false });
        }
    };

    function closeDialogRegistrar() {
        appctx.setDataContext({ dialogRegistrar: false });
    }

    return (
        <Dialog
            className="dialog-form"
            footer={<Bar design="Footer" endContent={
                <>
                    <Button design='Positive'>Guardar</Button>
                    <Button onClick={closeDialogRegistrar} design="Negative">Cancelar/Cerrar</Button>
                </>
            } />}
            open={estado}>
            <div className="dialog-content">
                <Title className="dialog-content-title">Fecha: {getDate()}</Title>
                <Label>Cliente / Ticket:</Label>
                <ComboBox className="dialog-content-combobox">
                    {dataTicket.map(ticket => (
                        <ComboBoxItem key={ticket.id} text={ticket.cliente.clienteNombre} additionalText={ticket.requerimientoCodigo} />
                    ))}
                </ComboBox>
                {/* <Text >El dia de hoy realize las siguientes actividades:</Text> */}
                <form className="form-ticket-actividades">
                    <div className="form-ticket-actividades-child-1">
                        <Title level="H5">Actividad</Title>
                        <TextArea rows={7} className='form-ticket-actividades-textArea' />
                    </div>
                    <div className="form-ticket-actividades-child-2">
                        <Title level="H5">Horas</Title>
                        <StepInput
                            className="form-ticket-actividades-step-input"
                            style={{ width: 4 }}
                            min={0}
                            max={8} />
                    </div>
                </form>
            </div>
        </Dialog>
    );
}

  //Cantidad de actividades 24, la suma de las actividades no puede ser más de 24
