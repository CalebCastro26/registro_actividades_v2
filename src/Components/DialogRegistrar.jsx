import { Bar, Button, Dialog, Title, TextArea, StepInput, ComboBox, ComboBoxItem, Label, BusyIndicator, } from "@ui5/webcomponents-react";
import { getDate } from "../utilities/utilities";
import { useContext, useEffect, useState, useRef } from "react";
import { ApplicationContext } from "../context/ApplicationContext";
import '../App.css'

export default function DialogRegistrar({ estado }) {

    const [dataTicket, setDataTicket] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const appctx = useContext(ApplicationContext)
    const inputText = useRef()
    const inputCantHours = useRef()
    const inputTicket = useRef()

    document.onkeydown = function (evt) {
        evt = evt || window.event;
        if (evt.keyCode == 27) {
            appctx.setDataContext({ dialogRegistrar: false });
        }
    };

    useEffect(() => {
        setIsLoading(true)
        fetch(
            "https://chain-services-ti-s-a-c--csti-s-a-c--ipoc-sandbox-ck3wg10b38b49.cfapps.eu10.hana.ondemand.com/api-ipoc/api/requerimiento/find-by-user", {
            method: 'GET',
            headers: {
                "Authorization": "Basic YW50aG9ueXJhbW9zZGV2QGdtYWlsLmNvbTpMaW1hMjAyMiQ="
            }
        }
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setDataTicket(result)
                setIsLoading(false)

            })
            .catch((error) => console.log("error", error));
    }, [])

    function registrarActividad(){
        let detalleActividad = inputText.current.value
        let cantidadHoras = inputCantHours.current.value

        console.log(detalleActividad, cantidadHoras)
    }

    function closeDialogRegistrar() {
        appctx.setDataContext({ dialogRegistrar: false });
    }

    return (
        <Dialog
            className="dialog-form"
            footer={<Bar design="Footer" endContent={
                <>
                    <Button design='Positive' onClick={registrarActividad}>Guardar</Button>
                    <Button onClick={closeDialogRegistrar} design="Negative">Cancelar/Cerrar</Button>
                </>
            } />}
            open={estado}>

            {isLoading ? (<div style={{display: 'flex', justifyContent: 'center'}}><BusyIndicator active/></div>) : (<div className="dialog-content">
                <Title className="dialog-content-title">Fecha: {getDate()}</Title>
                <Label>Cliente / Ticket:</Label>
                <ComboBox className="dialog-content-combobox">
                    {dataTicket.map(ticket => (
                        <ComboBoxItem key={ticket.id} text={ticket.requerimientoCodigo} additionalText={ticket.cliente.clienteNombre} />
                    ))}
                </ComboBox>
                {/* <Text >El dia de hoy realize las siguientes actividades:</Text> */}
                <form className="form-ticket-actividades">
                    <div className="form-ticket-actividades-child-1">
                        <Title level="H5">Actividad</Title>
                        <TextArea ref={inputText} rows={7} className='form-ticket-actividades-textArea' />
                    </div>
                    <div className="form-ticket-actividades-child-2">
                        <Title level="H5">Horas</Title>
                        <StepInput
                            ref={inputCantHours}
                            className="form-ticket-actividades-step-input"
                            style={{ width: 4 }}
                            min={0}
                            max={8} />
                    </div>
                </form>
            </div>)}
        </Dialog>
    );
}

  //Cantidad de actividades 24, la suma de las actividades no puede ser más de 24
