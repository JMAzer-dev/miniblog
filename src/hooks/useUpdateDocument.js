import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/Config";
import { updateDoc, doc } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null,
};

//useReducer será utilizado para simplificar o código e evitar a repetição. 
//apenas utilizando os cases prontos para cada etapa das requisições 
const updateReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "UPDATED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useUpdateDocument = (docCollection) => {
  const [response, dispatch] = useReducer(updateReducer, initialState);

  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const updateDocument = async (id, data) => {
    checkCancelBeforeDispatch({ 
        type: "LOADING" 
    });

    try {
        const docRef = await doc(db, docCollection, id)

        const updatedDocument = await updateDoc(docRef, data)
      
      // ação do sistema acontecendo check o memory leak, payload = dado dispachado    
      checkCancelBeforeDispatch({
        type: "UPDATED_DOC",
        payload: updatedDocument,
      });
    } catch (error) {
      checkCancelBeforeDispatch({ 
        type: "ERROR", 
        payload: error.message 
    });
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);
  //Retorno vai conter a função de inserção do doc e a reposta do reducer
  return { updateDocument, response };
};