import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Link from "@mui/material/Link";
import styles from "../../styles/Homepage.module.css"

const ProductCardHome = (props) => {
  return (
    <Card sx={{ width: 240 }} key={props.id} className={styles.productCardHome}>
      <CardActionArea>
        <CardMedia
          sx={{ height: 240 }}
          image={props.image}
          alt={props.alt}
          title={props.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
          <Typography variant="body1" color="text.primary" className="mt-1" >
            {props.price}
          </Typography>
        </CardContent>
        <CardActions>
          <Link
            key={props.link1_key}
            href={props.link1_to}
            underline="none"
            variant="body2"
          >
            {props.link1}
          </Link>
          <Link
            key={props.link1_key}
            href={props.link2_to}
            underline="none"
            variant="body2"
          >
            {props.link2}
          </Link>
          <button type="button" className={`btn btn-primary ${styles.btnText}`}>{props.btn1}</button>
          <button type="button" className={`btn btn-secondary ${styles.btnText}`}>{props.btn2}</button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default ProductCardHome;
