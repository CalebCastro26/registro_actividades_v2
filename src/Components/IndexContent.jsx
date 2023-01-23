import { useEffect, useState, useContext } from "react"
import { ApplicationContext } from '../context/ApplicationContext'
import { Page, Bar, Title, Panel, List, Text, ToolbarSpacer, Button, CustomListItem } from "@ui5/webcomponents-react"
import { getDate, funcAgrupamientoActividades } from "../utilities/utilities"
import '../App.css'
import DialogRegistrar from "./DialogRegistrar"
import { data } from "../../data"


export default function IndexContent() {

    const appctx = useContext(ApplicationContext)
    const [listadoActividades, setListadoActividades] = useState(data)
    const [actividad, setActividad] = useState({})

    useEffect(() => {

        fetch(
            "https://chain-services-ti-s-a-c--csti-s-a-c--ipoc-sandbox-ck3wg10b38b49.cfapps.eu10.hana.ondemand.com/api-ipoc/api/actividad/findAll", {
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

    function openDialogRegistrar() {
        appctx.setDataContext({
            dialogRegistrar: true
        })
    }

    return (
        <div className="index-content">
            <Page
                header={<Bar startContent={<Title className='index-content-title'>Mis actividades</Title>}
                    endContent={<Title className='index-content-title'>Fecha: {getDate()}</Title>} />}>

                <br />
                {funcAgrupamientoActividades(listadoActividades).reverse().map(actividad => (
                    <Panel
                        header={
                            <>
                                <Title level="H6">{actividad.fecha}</Title>
                                <ToolbarSpacer />
                                <Button style={{ margin: 5 }} design='Positive' icon="add" onClick={openDialogRegistrar}></Button>
                            </>}
                        key={actividad.fecha}
                        collapsed={true}
                        style={{ margin: 5 }}>
                        <List>
                            {actividad.actividad.map(detalle => (
                                <CustomListItem key={detalle.id} additionalText={detalle.horas}>
                                    <div className="custom-list-items">
                                        <div className="custom-list-items-text">
                                            <Text>{detalle.actividadDetalle}</Text>
                                        </div>
                                        <Text>{detalle.horas}</Text> 
                                        <Button icon="edit"></Button> 
                                    </div>
                                </CustomListItem>
                            ))}
                        </List>
                    </Panel>
                ))}
            </Page>
            <DialogRegistrar estado={appctx.data.dialogRegistrar} />
        </div>
    )
}
