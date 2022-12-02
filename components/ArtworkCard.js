import useSWR from "swr";
import Error from "next/error"
import Link from "next/link";
import { Button, Card } from "react-bootstrap";
import { useAtom } from "jotai";
import { favouritesAtom } from "../store"
import { useEffect, useState } from "react";



export default function ArtworkCard({objectID}){

    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)

    if(!data)
    {
        return null;
    }
    
    if(error)
    {
        return(
            <Error statusCode={404} />  
        )
    }
    else if(data != null && data != undefined)
    {
        console.log(data);
        return(
                <div>
               
                  <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={data.primaryImageSmall ? data.primaryImageSmall : "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"} />
                  <Card.Body>
                    <Card.Title>{data.title ? data.title : 'N/A'}</Card.Title>
                    <Card.Text>
                        <strong>Date: </strong>{data.objectDate ? data.objectDate : "N/A"}<br></br>
                        <strong>Classification: </strong>{data.classification ? data.classification : "N/A"}<br></br>
                        <strong>Medium: </strong>{data.medium ? data.medium : "N/A"}<br></br>
                    </Card.Text>
                    <Link href={'/artwork/' + objectID} passHref legacyBehavior><Button variant="primary">ID: {objectID}</Button></Link>
                  </Card.Body>
                </Card>  
                </div> 
            
        )
    }
    else{
        return null;
    }

}

