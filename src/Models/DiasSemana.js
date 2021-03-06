import { BaseModel } from "./BaseModel.js";
import { SemAulaError } from "../Errors/SemAulaError.js";

export class DiasSemana extends BaseModel {
  constructor() {
    super();
    this.collectionName = "diasSemana";
  }

  // Documento do dia
  async getDiaSnap(diaSemana) {
    return this.collectionReference
      .where("dia", "==", diaSemana)
      .get()
      .then((snapshot) => {
        return snapshot.docs[0];
      });
  }

  // Devolve uma lista com todas as aulas dentro de um dia com os seus horarios
  async getDiaAulasHorariosRef(diaSemana) {
    let diaRef;
    try {
      diaRef = (await this.getDiaSnap(diaSemana)).ref;
    } catch (error) {
      if (error instanceof TypeError) {
        throw new SemAulaError(diaSemana);
      }
    }
    const aulasHoraCollectionRef = diaRef.collection("aulas-hora");
    return aulasHoraCollectionRef;
  }

  // Devolve uma lista com todas as aulas dentro de um dia com os seus horarios
  async getDiaAulasHorariosSnap(diaSemana) {
    const aulasRef = await this.getDiaAulasHorariosRef(diaSemana);

    return aulasRef.get().then((snapshot) => {
      return snapshot.docs;
    });
  }
}

// const aula = new DiasSemana();
// aula.getDiaAulasHorariosRef("segunda").then((responde) => {
//   responde.where('hora_inicio', "==", "5:00").get().then(resp => {
//     console.log(resp.docs[0].data());
    
//   })
// });
