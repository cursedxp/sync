import { fireEvent, render, screen } from "@testing-library/react";
import { Formik } from "formik";
import TextField from "./TextField";
import "@testing-library/jest-dom";

describe("TextField", () => {
    it("renders a label", () => {
        render(
            <Formik initialValues={{ test: "" }} onSubmit={() => {}}>
                <TextField label="Test Label" name="test" type="text" placeholder="Test Placeholder" />
            </Formik>
        );
        expect(screen.getByText("Test Label")).toBeInTheDocument();
    });

    it("renders an input", () => {
        render(
            <Formik initialValues={{ test: "" }} onSubmit={() => {}}>
                <TextField label="Test Label" name="test" type="text" placeholder="Test Placeholder" />
            </Formik>
        );
        expect(screen.getByPlaceholderText("Test Placeholder")).toBeInTheDocument();
    });

});