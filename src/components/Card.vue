<template>
  <v-card width="500" height="100%" elevation="4">
    <div class="d-flex justify-center pa-5" >
      
       <v-avatar  size="300" tile >
          <v-img :src="curso.data.imagen"  ></v-img>
      </v-avatar>
    </div>
    <v-divider></v-divider>
    <!-- <v-spacer></v-spacer>  -->
    <v-card-text max-height="850" >
      <div>
        <h3 class="font-weight-bold mb-5">{{ curso.data.nombre }}</h3>
      </div>

      <div class="font-weight-bold ml-8 mb-2">Información</div>

      <v-timeline align-top dense >
        <v-timeline-item color="green" small>
          <div>
            <div class="font-weight-normal">
              Costo:<strong>{{ curso.data.costo }}</strong>
            </div>
            <div>Duración: {{ curso.data.duracion }}</div>
          </div>
        </v-timeline-item>

        <v-timeline-item color="deep-purple lighten-1" small>
          <div>
            <div class="font-weight-normal">
              Cupos:<strong>{{ curso.data.cupos }}</strong>
            </div>
            <div>
              Completado:
              <!-- <span>{{ completo(curso.data.cupos, curso.data.inscritos) }}</span> -->
              <span>{{curso.data.cursoCompleto}}</span>
            </div>
          </div>
        </v-timeline-item>

        <v-timeline-item color="green" small>
          <div>
            <div class="font-weight-normal">Fecha de Registro</div>
            <!-- <div>{{ fecha(curso.data.fecha) }}</div> -->
            <div>{{ curso.data.fecha }}</div>
            
          </div>
        </v-timeline-item>

        <v-timeline-item color="deep-purple lighten-1" small>
          <div>
            <div class="font-weight-normal">
              Descripción
            </div>
            <div>
                {{ curso.data.descripcion }}</span>
            </div>
          </div>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "card",
  props: { curso: { type: Object } },

  methods: {
    // completo(cupos, inscritos) {
    //   return inscritos < cupos ? 'No' : 'Si'
    // },
    // fecha(date) {
    //   const fecha = date.toDate();
    //   const yy = fecha.getFullYear();
    //   const mm = fecha.getMonth();
    //   const dd = fecha.getDate();
    //   return dd + "/" + mm + "/" + yy;
    // },
  },
};
</script>

<style>

.v-card__text {
    width: 100%;
    background-color: #CCD1D1;
}
</style>
