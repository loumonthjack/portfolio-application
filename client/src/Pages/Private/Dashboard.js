import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Error } from "../../Components/authForms";
import {
    SquarePaymentForm,
    CreditCardCVVInput,
    CreditCardExpirationDateInput,
    CreditCardNumberInput,
    CreditCardPostalCodeInput,
    CreditCardSubmitButton,
} from 'react-square-payment-form';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useAuth } from "../../Context/auth";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
}));


const Dashboard = () => {
    const stored = useAuth();
    const token = stored.authTokens.token;
    const userId = stored.authTokens.userId;
    const [isError, setIsError] = useState(false);
    const [data, setData] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [source, setSource] = useState("");
    const [visit, setVisit] = useState("");
    const [card, setCard] = useState("");

    const ProjectContainers = (props) => {
        const projects = props.projects && props.projects;
        return (
            <>
                <Div>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            {projects && projects.map(project => {
                                const projects = project.props.children;
                                return (
                                    <>
                                        <Grid item xs={4}>
                                            <Item>{projects.title}</Item>
                                            <Item>{projects.description}</Item>
                                            <Item>{projects.source}</Item>
                                            <button onClick={() => deleteProject(token.id, projects._id)}>Delete</button>
                                        </Grid>
                                    </>
                                )
                            }
                            )}
                        </Grid>
                    </Box>
                </Div>
            </>
        );
    };

    useEffect(() => {
        getProjects(userId)
    }, [userId])
    const getProjects = (userId) => {
        axios.get(`http://localhost:5000/dashboard/${userId}/projects`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(result => {
            if (result.status === 200) {
                setData(result.data);
            }
        })
    };
    const deleteProject = (userId, projectId) => {
        axios.delete(`http://localhost:5000/dashboard/${userId}/project/${projectId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) return response.data
        })
    }
    const createProject = (userId) => {
        axios.post(`http://localhost:5000/dashboard/${userId}/project`, {
            title,
            description,
            image,
            source,
            visit
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(result => {
            if (result.status === 200) {
                setData(result.data)
            } else {
                setIsError(true);
                setData(result.data)
            }
        })
    };
    const [errorMessages, setErrorMessages] = useState([]);

    function cardNonceResponseReceived(errors, nonce, cardData, buyerVerificationToken) {
        if (errors) {
            setErrorMessages(errors.map(error => error.message));
            return;
        }
        setErrorMessages([]);
        createCustomerCard(userId, nonce);
        alert('nonce created: ' + nonce + ', buyerVerificationToken: ' + buyerVerificationToken);
        // API.post('/payments', data: { nonce: nonce, buyerVerificationToken: buyerVerificationToken }) // implement this
    }

    function createCustomerCard(userId, nonce) {
        axios.post(`http://localhost:5000/dashboard/${userId}/customer/card`, {
            card_nonce: nonce
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(result => {
            if (result.status === 200) {
                setCard(result.data)
            } else {
                setIsError(true);
                setCard(result.data)
            }
        })
    }

    function createPaymentRequest() {
        return {
            requestShippingAddress: false,
            requestBillingInfo: true,
            currencyCode: 'USD',
            countryCode: 'US',
            total: {
                label: 'MERCHANT NAME',
                amount: '1',
                pending: false,
            },
            lineItems: [
                {
                    label: 'Subtotal',
                    amount: '1',
                    pending: false,
                },
            ],
        };
    }

    function createVerificationDetails() {
        return {
            amount: '100.00',
            currencyCode: 'USD',
            intent: 'CHARGE',
            billingContact: {
                familyName: 'Amelia Earhart',
                givenName: 'Amelia Earhart',
                email: 'jsmith@example.com',
                country: 'US',
                city: 'New York',
                addressLines: ['500 Electric Ave'],
                postalCode: '12345',
                phone: '020-794-0532',
            },
        };
    }

    function postalCode() {
        const postalCode = '12345'; // your logic here
        return postalCode;
    }

    function focusField() {
        return 'cardNumber';
    }
    const projects = data.projects;
    const project = projects && projects.map(project => { return <h3>{project}</h3> });

    return (<>


        <div>
            <h1>Admin Dashboard Page</h1>

            <SquarePaymentForm
                sandbox={true}
                applicationId={'sandbox-sq0idb-joBpNMZxHwenoERbzcXAOA'}
                locationId={'LYJ2ZZXCZ1QZ0'}
                cardNonceResponseReceived={cardNonceResponseReceived}
                createVerificationDetails={createVerificationDetails}
                postalCode={postalCode}
                focusField={focusField}
            >
                <div className="sq-divider">
                    <span className="sq-divider-label">Or</span>
                    <hr className="sq-divider-hr" />
                </div>

                <fieldset className="sq-fieldset">
                    <CreditCardNumberInput />
                    <div className="sq-form-third">
                        <CreditCardExpirationDateInput />
                    </div>

                    <div className="sq-form-third">
                        <CreditCardPostalCodeInput />
                    </div>

                    <div className="sq-form-third">
                        <CreditCardCVVInput />
                    </div>
                </fieldset>

                <CreditCardSubmitButton>Submit</CreditCardSubmitButton>

                <div className="sq-error-message">
                    {errorMessages.map(errorMessage => (
                        <li key={`sq-error-${errorMessage}`}>{errorMessage}</li>
                    ))}
                </div>
            </SquarePaymentForm>
            <ProjectContainers projects={project && project} />
            <Form>
                {isError && <Error>Unable to Create Project!</Error>}
                <Input
                    type="title"
                    value={title}
                    onChange={e => {
                        setTitle(e.target.value);
                    }}
                    placeholder="Title"
                />
                <Input
                    type="description"
                    value={description}
                    onChange={e => {
                        setDescription(e.target.value);
                    }}
                    placeholder="Description"
                />
                <Input
                    type="name"
                    value={image}
                    onChange={e => {
                        setImage(e.target.value);
                    }}
                    placeholder="Image"
                />
                <Input
                    type="source"
                    value={source}
                    onChange={e => {
                        setSource(e.target.value);
                    }}
                    placeholder="Source"
                />
                <Input
                    type="visit"
                    value={visit}
                    onChange={e => {
                        setVisit(e.target.value);
                    }}
                    placeholder="Visit"
                />
                <Button onClick={() => createProject(token.id)}>
                    New Project
                </Button>
            </Form>

        </div>
    </>)

}
//<Projects/>

export default Dashboard;