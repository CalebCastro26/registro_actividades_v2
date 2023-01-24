import { useEffect, useState, useContext, useRef } from "react"
import { ApplicationContext } from '../context/ApplicationContext'
import { Page, Bar, Title, Panel, ToolbarSpacer, Button, BusyIndicator, Toast, Tree, TreeItem, CustomListItem, Text, List, TreeItemCustom, Label } from "@ui5/webcomponents-react"
import { convertFecha, getDate } from "../utilities/utilities"
import DialogRegistrar from "./DialogRegistrar"
import "@ui5/webcomponents-icons/dist/navigation-right-arrow.js"
import '../App.css'
import { data } from "../../data"


export default function IndexContent() {

    const appctx = useContext(ApplicationContext)
    const toastRegistrar = useRef(null)
    const [isLoading, setIsLoading] = useState(false)
    const [registrado, setRegistrado] = useState(false)
    const [listadoActividades, setListadoActividades] = useState(data)
    const [actividad, setActividad] = useState({})

    // useEffect(() => {
    //     setIsLoading(true)
    //     fetch(
    //         "https://chain-services-ti-s-a-c--csti-s-a-c--ipoc-sandbox-ck3wg10b38b49.cfapps.eu10.hana.ondemand.com/api-ipoc/api/actividad/findAll", {
    //         method: 'GET',
    //         headers: {
    //             "Authorization": "Basic YW50aG9ueXJhbW9zZGV2QGdtYWlsLmNvbTpMaW1hMjAyMiQ="
    //         }
    //     }
    //     )
    //         .then((response) => response.json())
    //         .then((result) => {
    //             setListadoActividades(result);
    //             setIsLoading(false)
    //         })
    //         .catch((error) => console.log("error", error));
    // }, [registrado])

    console.log(listadoActividades)

    function openDialogRegistrar(actividad) {
        setActividad(actividad)
        appctx.setDataContext({
            dialogRegistrar: true
        })
    }

    return (
        <div className="index-content">
            <Page
                header={<Bar startContent={<Title className='index-content-title'>Mis actividades</Title>}
                    endContent={<Title className='index-content-title'>Fecha: {getDate()}</Title>} />}>
                <Button onClick={() => toastRegistrar.current.show()}></Button>
                <br />
                {isLoading ? (<div className="busy-indicator"><BusyIndicator active /></div>) : (listadoActividades.reverse().map(actividad => (
                    <Panel
                        header={
                            <>
                                <Title level="H6">{convertFecha(actividad.fechaRegistro)}</Title>
                                <ToolbarSpacer />
                                <Button style={{ margin: 5 }} design='Positive' icon="add" onClick={() => openDialogRegistrar(actividad)}></Button>
                            </>}
                        key={actividad.fechaRegistro}
                        collapsed={true}
                    >
                        <Tree>
                            {actividad.clienteGroups.map(cliente => (
                                <TreeItem
                                    text={cliente.clienteNombre}>
                                    {cliente.requerimientoGroups.map(requerimiento => (
                                        <TreeItem
                                            text={requerimiento.requerimientoCode}>
                                            {requerimiento.actividadGroups.map(act => (
                                                <TreeItemCustom
                                                    key={act.id}
                                                    content={
                                                        <div className="custom-list-items">
                                                            <div className="custom-list-items-text">
                                                                <Label wrapping={true}>{act.actividadDetalle}</Label>
                                                            </div>
                                                            <Text>{act.horas}</Text>
                                                            <Button icon="edit"></Button>
                                                        </div>
                                                    }>
                                                </TreeItemCustom>
                                            ))}
                                        </TreeItem>
                                    ))}
                                </TreeItem>
                            ))}
                        </Tree>
                    </Panel>
                )))}
            </Page>
            <DialogRegistrar estado={appctx.data.dialogRegistrar} actividad={actividad} registrado={registrado} setRegistrado={setRegistrado} />
            <Toast ref={toastRegistrar}>Registrado Correctamente</Toast>
        </div>
    )
}