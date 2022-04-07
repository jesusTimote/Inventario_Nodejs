
const on=(element,event, selector,handler) => {
  element.addEventListener(event,e=>{
    if(e.target.closest(selector)){
     
      
      handler(e)


    }
  })

}


on(document,"click","#btnEditar",e=>{
  const fila=e.target.parentNode.parentNode
  console.log(fila);

 id_edit.value=fila.children[0].textContent
  nombre_edit.value=fila.children[1].innerHTML
  usuario_edit.value=fila.children[2].innerHTML
  email_edit.value=fila.children[3].innerHTML
  permiso_edit.value=fila.children[4].innerHTML
  estado_edit.value=fila.children[6].textContent
 

 $('#demo-editar-usuario').modal('show')
})

on(document,"click","#btnEditarCliente",e=>{
  const fila=e.target.parentNode.parentNode

  id_edit.value=fila.children[0].textContent
  nombre_edit.value=fila.children[1].innerHTML
  apellido_edit.value=fila.children[2].innerHTML
  dni_edit.value=fila.children[3].innerHTML
  telefono_edit.value=fila.children[4].innerHTML
  correo_edit.value=fila.children[5].textContent


  $('#demo-editar-cliente').modal('show')

})

on(document,"click","#btnEditarProveedor",e=>{
  const fila=e.target.parentNode.parentNode


  txtCodigo_edit.value=fila.children[0].textContent
  proveedor_edit.value=fila.children[1].innerHTML
  dni_edit.value=fila.children[2].innerHTML
  ruc_edit.value=fila.children[3].innerHTML
  correo_edit.value=fila.children[4].textContent
  telefono_edit.value=fila.children[5].textContent
  estado_edit.value=fila.children[6].textContent
 
  $('#demo-modal-editProveedor').modal('show')
})


on(document, "click","#btn-CodBarra",e=>{
  const fila=e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
  
  txtCodigoBarraP.value=fila.children[0].textContent
  txtProductoP.value=fila.children[1].textContent
  console.log(fila);

  $('#barcodeModal').modal('show')
})

/*
const on=(element,event, selector,handler) => {
  element.addEventListener(event,e=>{
    if(e.target.closest(selector)){    
      handler(e)
    }
  })

}
on(document,"click","#btnEditar",e=>{
  let elements = document.getElementById("editForm").elements;
  const fila=e.target.parentElement.parentElement
  console.log(fila);
for (let i = 0, element; element = elements[i++];) {
   // console.log(element.name=fila.children[i].textContent);
  
}
$('#demo-editar-usuario').modal('show')
})*/