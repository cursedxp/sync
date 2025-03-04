import { render, screen,fireEvent } from "@testing-library/react";
import TextField from "./TextField";
import "@testing-library/jest-dom";
import { Formik } from "formik";

describe("TextField", () => {
    const renderWithFormik = (component: React.ReactNode) => {
        return render(
            <Formik
                initialValues={{ test: "" }}
                onSubmit={() => {}}
            >
                {component}
            </Formik>
        );
    };

    it("renders a label", () => {
        renderWithFormik(
            <TextField label="Test Label" name="test" type="text" placeholder="Test Placeholder" />
        );
        expect(screen.getByText("Test Label")).toBeInTheDocument();
    });

    it("renders an input", () => {
        renderWithFormik(
            <TextField label="Test Label" name="test" type="text" placeholder="Test Placeholder" />
        );
        expect(screen.getByPlaceholderText("Test Placeholder")).toBeInTheDocument();
    });

    it("checks toggle password visibility",()=>{
        renderWithFormik(
            <TextField label="Password" name="password" type="password" placeholder="Enter password" />
        )
        const passwordInput = screen.getByLabelText("Password");
        expect(passwordInput).toHaveAttribute("type","password");

        const toggleButton = screen.getByRole("button")
        fireEvent.click(toggleButton);
        expect(passwordInput).toHaveAttribute("type","text");

        fireEvent.click(toggleButton);
        expect(passwordInput).toHaveAttribute("type","password");
    })
});