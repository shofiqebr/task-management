import { Card, CardContent, Grid, Typography } from "@mui/material";


const User = () => {

    const targetAudienceData = [
        {
            title: 'Developers',
            description: 'Explore tools, resources, and discussions relevant to coding and development.',
        },
        {
            title: 'Corporate Professionals',
            description: 'Stay updated on industry trends, networking opportunities, and business insights.',
        },
        {
            title: 'Bankers',
            description: 'Access financial news, regulatory updates, and discussions on banking practices.',
        },
        // Add more categories as needed
    ];

    return (
        <div>
            <section className="py-16 bg-slate-200 text-white ">
                <section className='container mx-auto'>
                <Typography variant="h4" sx={{fontWeight:'700'}} align="center" gutterBottom className="text-4xl text-[#cf4fb3] uppercase  mb-8">
            users
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    {targetAudienceData.map((audience, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4}>
                            <Card >
                                <CardContent>
                                    <Typography variant="h6" sx={{fontWeight:'600'}} gutterBottom className=" mb-4">
                                        {audience.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {audience.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                </section>
            </section>
        </div>
    );
};

export default User;