import { useEffect, useState, useContext } from "react"
import {ApplicationContext} from '../context/ApplicationContext'
import { Page, Bar, Title, Panel, List, Text , ToolbarSpacer, Button, StandardListItem } from "@ui5/webcomponents-react"
import { getDate, funcAgrupamientoActividades } from "../utilities/utilities"
import '../App.css'
import DialogRegistrar from "./DialogRegistrar"
import DialogEditar from "./DialogEditar"


export default function IndexContent() {

    const appctx = useContext(ApplicationContext)
    const [listadoActividades, setListadoActividades] = useState([])
    const [actividad, setActividad] = useState({})

    useEffect(() => {
    
        fetch(
            "https://chain-services-ti-s-a-c--csti-s-a-c--ipoc-sandbox-ck3wg10b38b49.cfapps.eu10.hana.ondemand.com/api-ipoc/api/actividad/findAll",{
                method: 'GET',
                headers: {
                    "Authorization": "Basic YW50aG9ueXJhbW9zZGV2QGdtYWlsLmNvbTpMaW1hMjAyMiQ="
                }
            }
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setListadoActividades(result);
                
            })
            .catch((error) => console.log("error", error));
    }, [])

    function openDialogRegistrar(){
        appctx.setDataContext({
            dialogRegistrar: true
        })
    }

    function openDialogEditar(actividad){
        setActividad(actividad)
        appctx.setDataContext({
            dialogEditar: true
        })
    }

    return (
        <div className="index-content">
            <Page
                header={<Bar startContent={<Title className='index-content-title'>Registro de actividades</Title>} 
                endContent={<Title className='index-content-title'>Fecha: {getDate()}</Title>} />}>
                <Button style={{margin: 5}} design='Positive' onClick={openDialogRegistrar}>Registrar</Button>
                <br />
                {funcAgrupamientoActividades(listadoActividades).reverse().map(actividad => (
                    <Panel 
                        header={
                        <>
                            <Title level="H6">{actividad.fecha}</Title>
                            <ToolbarSpacer />
                            <Button style={{margin: 5}} design="Emphasized" onClick={() => openDialogEditar(actividad)}>Editar</Button>
                        </>} 
                        key={actividad.fecha} 
                        collapsed={true}
                        style={{margin: 5}}>
                        <List>
                            {actividad.actividad.map(detalle => (
                                <StandardListItem key={detalle.id} additionalText={detalle.horas}><Text>{detalle.actividadDetalle}</Text></StandardListItem>
                            ))}
                        </List>
                    </Panel>
                ))}
            </Page>
            <DialogRegistrar estado={appctx.data.dialogRegistrar}/>
            <DialogEditar estado={appctx.data.dialogEditar} actividad={actividad}/>
        </div>
    )
}
