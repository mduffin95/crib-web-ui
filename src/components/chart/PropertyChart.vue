<script lang="ts">
import { Scatter } from "vue-chartjs-typescript";
import { Component, Vue, Emit } from "vue-property-decorator";
import { namespace } from 'vuex-class';

const propns = namespace('properties')

@Component({
  extends: Scatter
})
export default class PropertyChart extends Vue {

  @propns.State properties: Property[]
  propsWithArea: Property[]

  options = { onClick: this.onClickEvent }

  onClickEvent(evt, array) {
    if (array.length != 0) {
        var position = array[0]._index;
        // var activeElement = this.tooltip._data.datasets[0].data[position]
        var activeElement = this.propsWithArea[position]
        this.selectMarker(activeElement)
        console.log(activeElement);
    } else {
        console.log("You selected the background!");            
    }  
  }

  getPropsWithArea() {
    return this.properties.filter(item => item.floorArea > 0)
  }

  @Emit('propertyClicked')
  selectMarker (property) {
    return property
  }

  mounted() {
    this.propsWithArea = this.getPropsWithArea()
    var points = this.propsWithArea.map( item => { return { x: item.price.amount, y: item.floorArea }})
    console.log(points)
    this.renderChart({
        datasets: [{
            label: 'Property prices vs floor area (sq.m.)',
            backgroundColor: '#f87979',
            data: points
        }]
    }, this.options);
  }
}
</script>