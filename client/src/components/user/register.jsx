import { Form, Button } from "react-bootstrap"
const RegsiterPage = () => {
    return <div className="container">
        <div className="row">
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    {false && <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username </Form.Label>
                    <Form.Control type="text" placeholder="Enter username" />
                    {false && <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>confirm password</Form.Label>
                    <Form.Control type="password" placeholder="Enetr confirm Password" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    </div>
}

export default RegsiterPage;