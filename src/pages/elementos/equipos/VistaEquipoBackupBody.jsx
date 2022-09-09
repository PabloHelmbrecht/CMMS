<Grid item xs={12} sm={12} md={8} lg={8}
                        sx={{
                            p: 2,
                            width:'100% !important',
                            height: '80%',
                            overflow: 'auto',
                            overflowY: "overlay",
                            backgroundColor: "secondary.lighter",
                            "::-webkit-scrollbar-track": {
                                "borderRadius": "0px",
                                "backgroundColor": "rgb(128, 128, 128, 0)",
                            },
                            "::-webkit-scrollbar": {
                                "width": "7px",
                                "backgroundColor": "rgb(128, 128, 128, 0)",
                            },

                            "::-webkit-scrollbar-thumb": {
                                "borderRadius": "10px",
                                "backgroundColor": "rgb(128, 128, 128, 0)",
                            },

                            ":hover::-webkit-scrollbar-thumb": {
                                "backgroundColor": "rgb(128, 128, 128, 0.5)",
                            }
                        }}
                    >
                        <Stack
                            direction="column"
                            spacing={2}
                        >
                            <Card sx={{ height: '300px' }} variant="outlined">{isMobile} </Card>
                            <Card sx={{ height: '300px' }} variant="outlined">card</Card>
                            <Card sx={{ height: '300px' }} variant="outlined">card</Card>
                        </Stack>
                    </Grid>