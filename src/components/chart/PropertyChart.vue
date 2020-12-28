<script lang="ts">
import { Scatter } from "vue-chartjs-typescript";
import { Component, Vue } from "vue-property-decorator";
import { namespace } from 'vuex-class';

const propns = namespace('properties')

@Component({
  extends: Scatter
})
export default class PropertyChart extends Vue {

  @propns.State properties: Property[]

  options = {
    onclick() {
      console.log("clicked")
    }
  }

  mounted() {
    console.log("mounted")
    const points = this.properties.map( item => { return { x: item.price.amount, y: item.floorArea }}).filter(item => item.y > 0)
    console.log(points)
    this.renderChart({
        datasets: [{
            label: 'Scatter Dataset',
            backgroundColor: '#f87979',
            data: points
        }]
    });
  }
}
</script>