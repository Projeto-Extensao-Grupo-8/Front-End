import { Badge } from "../../../../atomic/atom";
import { DataCard, TitleCard } from "../../../../atomic/molecule";
import { SalesChart, ConsultasChart } from "../../../../atomic/organism";
import { AdminTemplate } from "../../../../atomic/template";
import InventoryIcon from '@mui/icons-material/Inventory';

export default function DashboardPaciente() {
  return (
    <AdminTemplate> 
      <div style={{display: "flex", flexDirection: "column", width: "100%", gap: "30px"}}>
        <div>
          <h2>Dashboard de Pacientes</h2>
          <p>Análise demográfica e comportamental dos pacientes</p>
        </div>
        <div style={{display: "flex", width: "100%", justifyContent: "space-between", gap: "var(--gap-xl)"}}>
          <DataCard title={"Total de pacientes ativos"} value={"466"} Icon={InventoryIcon}/>
          <DataCard title={"Novos pacientes (Ano)"} value={"198"} Icon={InventoryIcon}/>
          <DataCard title={"Taxa de retenção média"} value={"93.4%"} Icon={InventoryIcon}/>
        </div>
        <div style={{display: "flex", width: "100%", justifyContent: "space-between", gap: "var(--gap-xl)"}}>
          <TitleCard 
            title="Taxa de Retenção Mensal"
            subtitle={"Percentual de pacientes que retornam"}
          >
          <SalesChart/>
          </TitleCard>
          <TitleCard title="Novos Pacientes por Mês">
          <ConsultasChart/>
          </TitleCard>
        </div>
        <div>
          <TitleCard title="Top 5 pacientes" subtitle="Pacientes mais frequentes no ano"> 
            <table style={{width: "100%", textAlign: "left"}}>
              <tr style={{backgroundColor: "var(--brancoBaseModal)"}}> 
                <th>Paciente</th>
                <th>Consultas</th>
                <th>Valor Total</th>
                <th>Status</th>
              </tr>
              <tr>
                <td>Ana Fernanda</td>
                <td>50</td>
                <td>R$ 7.200</td>
                <td><Badge text = "Ativo"/></td>
              </tr>
              <tr>
                <td>Lucas Rosseno</td>
                <td>30</td>
                <td>R$ 6.600</td>
                <td><Badge text = "Ativo"/></td>
              </tr>
              <tr>
                <td>Luiza Andrade</td>
                <td>20</td>
                <td>R$ 6.000</td>
                <td><Badge text = "Ativo"/></td>
              </tr>
              <tr>
                <td>Maria Clara Costa</td>
                <td>14</td>
                <td>R$ 5.400</td>
                <td><Badge text = "Ativo"/></td>
              </tr>
              <tr>
                <td>Carla Souza</td>
                <td>13</td>
                <td>R$ 4.800</td>
                <td><Badge text = "Ativo"/></td>
              </tr>
            </table>
          </TitleCard>
        </div>
      </div>
    </AdminTemplate>
  );
}