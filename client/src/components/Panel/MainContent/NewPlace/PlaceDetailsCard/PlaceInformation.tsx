// import { PhotoCamera } from "@mui/icons-material";
// import { Grid, Card, Alert, CardMedia, Slide, IconButton, Rating, Typography, CardContent, Divider } from "@mui/material";
// import { Tooltip } from "leaflet";
// import { FC, useMemo } from "react"
// import { SocialIcon } from "react-social-icons";
// import { ImageUpload } from "../../../../reusable/ImageUpload";


export default {}

// export const PlaceInformation: FC<any> = ({

// }) => {
//     const icons = [
//         {
//             icon: <PhoneIcon color="primary" />,
//             text: phone || 'Phone number'
//         },
//         {
//             icon: <MailOutlineIcon color="primary" />,
//             text: email || 'Contact e-mail'
//         },
//         {
//             icon: <LanguageIcon color="primary" />,
//             text: website || 'Website address'
//         }
//     ]

//     return (
//         <>
//             <Grid container >
//                 <Grid container item>
//                     <Card elevation={10}
//                         sx={{ flexGrow: 1, paddingBottom: '12px', paddingTop: '12px', paddingRight: '20px', backgroundColor: 'panelCard.main' }}>
//                         <Grid container justifyContent="flex-end">
//                             <Grid item>
//                                 <Tooltip title={'This is a current status of your place'}>
//                                     <Alert severity="error" variant="filled" >
//                                         This place is now <b>{status?.toUpperCase() || 'CLOSED'}</b>
//                                     </Alert>
//                                 </Tooltip>
//                             </Grid>
//                         </Grid>
//                     </Card>
//                 </Grid>
//             </Grid>
//             <Grid container item sx={{ mt: '20px' }}>
//                 <Grid item lg={3} style={{ textAlign: 'center', marginLeft: 20 }}>
//                     <PlaceLogo
//                         logo={logo}
//                         isEditable={isEditable}
//                         setImageFile={setImageFile}
//                     />
//                     <Rating
//                         style={{ marginTop: 20 }}
//                         name="simple-controlled"
//                         value={averageNote?.average || 5}
//                         readOnly
//                     />
//                 </Grid>
//                 <Grid item container direction="column" lg={8} sx={{ ml: '30px' }}>
//                     <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
//                         {name || 'This is the name of your business'}
//                     </Typography>
//                     <Typography variant="h6">
//                         {subtitle || 'This is a subtitle of your business'}
//                     </Typography>
//                     <Typography variant="body1">{type || 'Business type'}</Typography>
//                     <div>
//                         <IconButton size="large"><SocialIcon target="_blank" rel="noopener noreferrer" style={{ width: 35, height: 35, display: 'table-cell' }} url="http://facebook.com" /></IconButton>
//                         <IconButton size="large"><SocialIcon target="_blank" rel="noopener noreferrer" style={{ width: 35, height: 35, display: 'table-cell' }} url="http://instagram.com" /></IconButton>
//                     </div>
//                 </Grid>
//             </Grid>
//             <Grid item container justifyContent="center" sx={{ mt: '10px', mb: '10px' }}>
//                 <Grid item lg={10}>
//                     <Card elevation={10} style={{ flexGrow: 1 }}>
//                         <CardContent>
//                             <div style={{ display: 'inline-block', overflowWrap: 'break-word' }}>
//                                 <Typography variant="body1" >
//                                     {description || 'This is a brief description of your business. In this section you can make your visitors interested in your company.'}
//                                 </Typography>
//                             </div>
//                         </CardContent>
//                     </Card>

//                 </Grid>
//                 <Grid item lg={10} style={{ marginTop: 20 }}>
//                     <Divider sx={{ width: '100%' }}></Divider>
//                 </Grid>
//             </Grid>
//             <Grid item container lg={12} justifyContent="space-around" sx={{ mt: '20px', mb: '20px' }}>
//                 {icons.map((item, index) => {
//                     return (
//                         <Grid item lg={3} key={index}>
//                             <Card elevation={10}>
//                                 <CardContent>
//                                     <Grid container justifyContent="center">
//                                         <Grid item lg={12} style={{ textAlign: 'center' }}>
//                                             {item.icon}
//                                         </Grid>
//                                         <Grid item>
//                                             {item.text}
//                                         </Grid>
//                                     </Grid>
//                                 </CardContent>
//                             </Card>
//                         </Grid>
//                     );
//                 })}
//             </Grid>
//         </>
//     )
// 
