import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function MondelForData({ purchaseOrder, formData, ...props }) {
    let po;

    if(formData){
        po = purchaseOrder?.PO?.filter((po) => po?.PO_key == formData.formPurchase)[0]
    }

    console.log("form data", formData)
    // console.log("purchaseOrder data", po)

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Purchase Order
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Supplier Name : {formData?.formSupplier}</h5>
                <h6>Purchase Order : {formData?.formPurchase}</h6>
                <h6>PO Number : {po?.PONumber}</h6>
                <h6>Description : {po?.Description}</h6>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
