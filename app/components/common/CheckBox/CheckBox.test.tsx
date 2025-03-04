import {render,screen,fireEvent, act} from "@testing-library/react"
import CheckBox from "./CheckBox"
import "@testing-library/jest-dom"
import {Formik} from "formik"


describe("Check Box",()=>{
    const renderWithFormik = (component:React.ReactNode)=>{
        return render(
            <Formik initialValues={{test:false}} onSubmit={()=>{}}>
                {component}           
            </Formik>
        )
    }

    it(" renders a label",()=>{
        renderWithFormik(
            <CheckBox name="test" >Test Label</CheckBox>
        )
        expect(screen.getByText("Test Label")).toBeInTheDocument()
    })
    it("renders a checkbox",()=>{
        renderWithFormik(
            <CheckBox name="test" >Test Label</CheckBox>
        )
        expect(screen.getByRole("checkbox")).toBeInTheDocument()
    })
    it("toggles checkbox",async ()=>{
        renderWithFormik(
            <CheckBox name="test" >Test Label</CheckBox>
        )
        const checkBox = screen.getByRole("checkbox")
        expect(checkBox).toBeInTheDocument()
        
        await act(async () => {
            fireEvent.click(checkBox)
        })
        expect(checkBox).toBeChecked()

        await act(async () => {
            fireEvent.click(checkBox)
        })
        expect(checkBox).not.toBeChecked()
    })
    
})