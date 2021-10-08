import React, { useEffect, useState } from 'react';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import axios from 'axios';


function Cardv1() {
    const baseUrl="http://localhost:80/Inventario/"
    const [data, setData]=useState([]);
    const [modalInsertar, setModalInsertar]= useState(false);
    //const [modalEditar, setModalEditar]= useState(false);
    const [ArticuloSeleccionado, setArticuloSeleccionado]=useState({
        idArticulo: '',
        idCategoria: '',
        Nombre: '',
        Fecha_Registro: ''
    });

    const handleChange=e=>{
        const {name, value}=e.target;
        setArticuloSeleccionado((prevState)=>({
            ...prevState,
            [name]: value
        }))
        console.log(ArticuloSeleccionado);
    }

    const abrirCerrarModalInsertar=()=>{
        setModalInsertar(!modalInsertar);
    }

    
  
    const peticionGet=async()=>{
      await axios.get(baseUrl)
      .then(response=>{
        setData(response.data);
      })
    }

    const peticionPost=async()=>{
        var f = new FormData();
        f.append("idCategoria", ArticuloSeleccionado.idCategoria);
        f.append("Nombre", ArticuloSeleccionado.Nombre);
        f.append("Fecha_Registro", ArticuloSeleccionado.Fecha_Registro);
        f.append("METHOD", "POST");
        await axios.post(baseUrl, f)
        .then(response=>{
            setData(data.concat(response.data));
          abrirCerrarModalInsertar();
        })
      }
            
      //const peticionPut=async()=>{
        //var f = new FormData();
        //f.append("idCategoria",ArticuloSeleccionado.idCategoria);
        //f.append("Nombre",ArticuloSeleccionado.Nombre);
        //f.append("Fecha_Registro",ArticuloSeleccionado.Fecha_Registro);
        //f.append("METHOD", "PUT");
        //await axios.post(baseUrl, f, {params: {idArticulo: ArticuloSeleccionado.idArticulo}})
        //.then(response=>{
          //setData(data.concat(response.data));
          //var dataNueva= data;
            //dataNueva.map(articulos=>{
              //  if(articulos.idArticulo===ArticuloSeleccionado.idArticulo){
                //    articulos.Nombre===ArticuloSeleccionado.Nombre;
                  //  articulos.Fecha_Registro===ArticuloSeleccionado.Fecha_Registro;
                //}
            //});
          //setData(dataNueva);
          //abrirCerrarModalEditar();
        //})
      //}
  
    //const seleccionarArticulo=(articulos, caso)=>{
      //  setArticuloSeleccionado(articulos);
       // (caso==="Editar")&&
       // abrirCerrarModalEditar()
    
    //}
    
    
      useEffect(()=>{
      peticionGet();
      },[]) 

    return (
        <div className="container" style={{textAlign: 'center'}}>
            <div className="row">
            <div className="col-md-10"> 
                    <br/>
                    <button className="btn btn-success" onClick={()=>abrirCerrarModalInsertar()}> Insertar </button>
                    <br/>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Categoria</th>
                                <th>Nombre</th>
                                <th>Fecha de registro</th>
                                <th>Accciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(articulos=>(
                                <tr key={articulos.idArticulo}>
                                    <td>{articulos.idArticulo}</td>
                                    <td>{articulos.idCategoria}</td>
                                    <td>{articulos.Nombre}</td>
                                    <td>{articulos.Fecha_Registro}</td>
                                    <td>
                                        <button className="btn btn-primary">Editar</button>
                                        <button className="btn btn-danger">Eliminar</button>
                                    </td>
                                </tr>    
                            ))}
                        </tbody>
                    </table>
                    <Modal isOpen={modalInsertar}>
                        <ModalHeader> Insertar Articulo</ModalHeader>
                        <ModalBody>
                            <div className="form-group">
                                <label>Categoria</label>
                                <br />
                                <input type="text" className="form-control" name="IdCategoria" onChange={handleChange}/>
                                
                                <label>Nombre</label>
                                <br />
                                <input type="text" className="form-control" name="Nombre" onChange={handleChange}/>
                                
                                <label>Fecha de registro</label>
                                <br />
                                <input type="text" className="form-control" name="Fecha_Registro" onChange={handleChange}/>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button>{"  "}
                            <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
                        </ModalFooter>
                    </Modal>
                  </div>  
                </div>
            </div>            
       
    );
}

export default Cardv1;
