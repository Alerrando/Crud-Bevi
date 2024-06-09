import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { ModalType } from "../Table";

type ConfirmDialogProps = {
  openModal: ModalType;
  setOpenModal: (openModal: ModalType) => void;
};

export function ConfirmDialog({ openModal, setOpenModal }: ConfirmDialogProps) {
  return (
    <Dialog open={openModal.status} aria-labelledby="draggable-dialog-title">
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        Você realmente quer deletar esse produto?
      </DialogTitle>
      <DialogActions>
        <Button autoFocus onClick={() => setOpenModal({ ...openModal, status: false })}>
          Cancelar
        </Button>
        <Button onClick={() => setOpenModal({ ...openModal, confirm: true, status: false })}>Confirmar</Button>
      </DialogActions>
    </Dialog>
  );
}
