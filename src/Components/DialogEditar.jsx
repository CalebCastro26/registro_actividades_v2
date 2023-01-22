import { Bar, Button, Dialog, List, StandardListItem, Text} from "@ui5/webcomponents-react";
import { useContext } from "react";
import { ApplicationContext } from "../context/ApplicationContext";

export default function DialogEditar({estado, actividad}) {
    const appctx = useContext(ApplicationContext);

    document.onkeydown = function (evt) {
        evt = evt || window.event;
        if (evt.keyCode == 27) {
            appctx.setDataContext({ dialogEditar: false });
        }
    };

    function closeDialogEditar(){
        appctx.setDataContext({ dialogEditar: false })
    }

    //console.log(actividad)

    return (
        <Dialog style={{ width: "40vw" }}
            headerText={actividad.fecha}
            open={estado}
            footer={<Bar design="Footer" endContent={
                <>
                    <Button design='Emphasized'>Editar</Button>
                    <Button onClick={closeDialogEditar} design="Negative">Cancelar/Cerrar</Button>
                </>
            } />}>

            <List>
                {actividad.actividad?.map(detail => (
                    <StandardListItem additionalText={detail.horas}><Text>{detail.actividadDetalle}</Text></StandardListItem>
                ))}
            </List>
        </Dialog>
    );
}
