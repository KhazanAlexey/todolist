import React, {useEffect} from 'react'
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Button, Grid} from '@material-ui/core'
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "./auth-reducer";
import {AppRootStateType} from "../../app/store";
import {Redirect} from "react-router-dom";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {



    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required Password'
            } else if (values.password.length < 3) {
                errors.password = 'password must be > 2 sumbols';
            }

            return errors;
        },
        onSubmit: values => {
            const email = values.email
            const password = values.password
            const rememberMe = values.rememberMe
            dispatch(loginTC({email, password, rememberMe}))
            // alert(JSON.stringify(values))
            formik.resetForm()
        }


    })
    const isLoggedIn=useSelector<AppRootStateType,boolean>(state => state.auth.isLoggedIn)
    if(isLoggedIn){
        return <Redirect to={'/'}/>
    }

    return <Grid container justify="center">
        <Grid item xs={4}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}>here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            {...formik.getFieldProps('email')}
                            // name="email"
                            // onChange={formik.handleChange}
                            // value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email ?
                            <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                        <TextField
                            onBlur={formik.handleBlur}
                            type="password"
                            label="Password"
                            margin="normal"
                            name='password'
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password ?
                            <div style={{color: 'red'}}>{formik.errors.password}</div> : null}

                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                checked={formik.values.rememberMe}
                                name="rememberMe"
                            />}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                    </FormGroup>
                </FormControl>

            </form>

        </Grid>
    </Grid>
}
