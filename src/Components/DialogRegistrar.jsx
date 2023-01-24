import { Bar, Button, Dialog, Title, TextArea, StepInput, ComboBox, ComboBoxItem, Label, BusyIndicator} from "@ui5/webcomponents-react";
import { useContext, useEffect, useState, useRef } from "react";
import { ApplicationContext } from "../context/ApplicationContext";
import "@ui5/webcomponents-icons/dist/save"
import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js"
import '../App.css'
import { convertFecha } from "../utilities/utilities";

export default function DialogRegistrar({ estado, actividad, setRegistrado, registrado }) {
    const [dataTicket, setDataTicket] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [body, setBody] = useState({})
    const appctx = useContext(ApplicationContext)

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
                setDataTicket(result)
                setIsLoading(false)

            })
            .catch((error) => console.log("error", error));
    }, [])

    function registrarActividad() {
        setIsLoading(true)
        fetch(
            "https://chain-services-ti-s-a-c--csti-s-a-c--ipoc-sandbox-ck3wg10b38b49.cfapps.eu10.hana.ondemand.com/api-ipoc/api/actividad/save-information-multiple", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic YW50aG9ueXJhbW9zZGV2QGdtYWlsLmNvbTpMaW1hMjAyMiQ="
            },
            body: JSON.stringify([body])
        }
        )
            .then((response) => response.json())
            .then(() => {
                setIsLoading(false)
                setRegistrado(!registrado)
            })
            .catch((error) => console.log("error", error));
    }

    function handleInputChange(e){
        setBody({
            ...body,
            [e.target.name] : e.target.value
        })
    }

    function handleChange(e) {
        let findTicket = dataTicket.find(ticket => ticket.requerimientoCodigo == e.target.value)
        setBody({
            ...body,
            fecha: new Date(),
            clienteCodigoErp: findTicket.cliente.clienteCodigoErp,
            coordinadorErp: findTicket.coordinador.coordinadorErp,
            requerimientoCodigo: findTicket.requerimientoCodigo,
            aprobacionCliente: "",
            aprobacionPlanificacion: "",
        })
    }

    function closeDialogRegistrar() {
        appctx.setDataContext({ dialogRegistrar: false });
    }

    return (
        <Dialog
            className="dialog-form"
            footer={<Bar design="Footer" endContent={
                <>
                    <Button style={{width: '60px'}} icon="save" design='Positive' onClick={registrarActividad}/>
                    <Button style={{width: '60px'}} icon="decline" onClick={closeDialogRegistrar} design="Negative"/>
                </>
            } />}
            open={estado}>

            {isLoading ? (<div style={{ display: 'flex', justifyContent: 'center' }}><BusyIndicator active /></div>) : (<div className="dialog-content">
                <Title className="dialog-content-title">{actividad.fechaRegistro}</Title>
                <Label>Ticket:</Label>
                <ComboBox className="dialog-content-combobox" onChange={handleChange} >
                    {dataTicket.map(ticket => (
                        <ComboBoxItem
                            key={ticket.id}
                            text={ticket.requerimientoCodigo}
                            additionalText={ticket.cliente.clienteNombre} />
                    ))}
                </ComboBox>
                {/* <Text >El dia de hoy realize las siguientes actividades:</Text> */}
                <form className="form-ticket-actividades">
                    <div className="form-ticket-actividades-child-1">
                        <Title level="H5">Actividad</Title>
                        <TextArea name="actividadDetalle" onInput={handleInputChange} rows={7} className='form-ticket-actividades-textArea' />
                    </div>
                    <div className="form-ticket-actividades-child-2">
                        <Title level="H5">Horas</Title>
                        <StepInput
                            className="form-ticket-actividades-step-input"
                            name="horas"
                            onChange={handleInputChange}
                            min={0}
                            max={8} />
                    </div>
                </form>
            </div>)}
        </Dialog>
    );
}

  //Cantidad de actividades 24, la suma de las actividades no puede ser más de 24
