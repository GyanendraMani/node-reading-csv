import React from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import MondelForData from "./Mondel";

export default function FormComponent({ csvData }) {


    const [modalShow, setModalShow] = React.useState(false);
    const [formData, setFormData] = React.useState();
    const [selectedOption, setSelectedOption] = React.useState();
    const [purchaseOrder, setPurchaseOrder] = React.useState();


    const handleDropdownChange = (event) => {
        const value = event.target.value;
        setSelectedOption(value);

        const poList = csvData?.data?.filter((po) => po.Supplier == value);
        setPurchaseOrder(poList[0]);
    };


    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm();
    const onSubmit = (data) => {
        // alert(JSON.stringify(data));
        setModalShow(true)
        setFormData(data);


    };

    const suppliers = () => {
        console.log("data.data", csvData.data)
        return csvData.data.map((data, index) => {
            return <option key={index} value={data.Supplier}>{data.Supplier}</option>
        })
    }

    const poList = (data) => {
        console.log("data.data", csvData.data)
        return data.map((data, index) => {
            return <option key={index} value={data.PO_key}>{data.PO_key}</option>
        })
    }


    return (
        <Container>
            <MondelForData
                purchaseOrder={purchaseOrder}
                formData={formData}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="Name" style={{ paddingTop: "20px" }}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Name"
                        {...register("Name", { required: true, maxLength: 80 })}
                    />
                    {errors.Name?.type === "required" && "Name is required"}
                    {errors.Name?.type === "maxLength" &&
                        "Name must be less then 80 characters"}
                </Form.Group>

                <Form.Group controlId="formSupplier" style={{ paddingTop: "20px" }}>
                    <Form.Label>Supplier Name</Form.Label>
                    <Form.Control
                        as="select"
                        {...register("formSupplier", {
                            required: true
                        })} value={selectedOption} onChange={handleDropdownChange}
                    >
                        <option value="">Select Supplier</option>
                        {csvData && suppliers()}
                    </Form.Control>

                    {errors.formSupplier?.type === "required" && "Supplier is required"}


                </Form.Group>
                <Form.Group controlId="formPurchase" style={{ paddingTop: "20px" }}>
                    <Form.Label>Purchase Order</Form.Label>
                    <Form.Control
                        as="select"
                        {...register("formPurchase", {
                            required: true
                        })} //value={selectedOption} onChange={handleDropdownChange}
                    >
                        <option value="">select</option>
                        {purchaseOrder && poList(purchaseOrder.PO)}
                    </Form.Control>

                    {errors?.formPurchase?.type === "required" && "Purchase is required"}
                </Form.Group>
                <div style={{ paddingTop: "20px" }}>
                    <Button type="submit">Submit</Button>
                </div>
            </Form>
        </Container>
    );
}
