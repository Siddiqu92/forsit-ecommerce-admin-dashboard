<template>
  <v-container class="py-8">
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <div class="chart-card">
          <div class="summary-section">
            <div class="summary-box">
              <h3>Total Orders</h3>
              <p>{{ totalOrders }}</p>
            </div>
            <div class="summary-box">
              <h3>Total Revenue</h3>
              <p>${{ totalRevenue.toLocaleString() }}</p>
            </div>
          </div>
          <div class="chart-wrapper">
            <canvas ref="chartRef" />
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import Chart from 'chart.js/auto'
import API from '../api'

const chartRef = ref(null)
const salesData = ref([])

const totalOrders = computed(() =>
  salesData.value.reduce((sum, item) => sum + item.orders, 0)
)
const totalRevenue = computed(() =>
  salesData.value.reduce((sum, item) => sum + item.revenue, 0)
)

onMounted(async () => {
  try {
    const res = await API.get('/sales')
    salesData.value = res.data

    const ctx = chartRef.value.getContext('2d')
    const gradient = ctx.createLinearGradient(0, 0, 0, 400)
    gradient.addColorStop(0, '#00BFA5')
    gradient.addColorStop(1, '#00897B')

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: salesData.value.map(d => d.date),
        datasets: [
          {
            label: 'Revenue',
            data: salesData.value.map(d => d.revenue),
            backgroundColor: gradient,
            borderRadius: 10,
            barThickness: 30
          },
          {
            label: 'Orders',
            data: salesData.value.map(d => d.orders),
            backgroundColor: 'rgba(255, 179, 0, 0.6)',
            borderRadius: 10,
            barThickness: 30
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: '#4E5D6C',
              font: {
                size: 14,
                weight: 'bold'
              }
            }
          },
          tooltip: {
            backgroundColor: '#fff',
            titleColor: '#000',
            bodyColor: '#00897B',
            borderColor: '#00897B',
            borderWidth: 1,
            titleFont: { weight: 'bold' },
            padding: 10
          }
        },
        scales: {
          x: {
            ticks: {
              color: '#6B7280',
              font: { size: 12 }
            },
            grid: {
              color: 'rgba(0,0,0,0.05)'
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: '#6B7280',
              font: { size: 12 }
            },
            grid: {
              color: 'rgba(0,0,0,0.05)'
            }
          }
        }
      }
    })
  } catch (error) {
    console.error('Error fetching sales data:', error)
  }
})
</script>

<style scoped>
.chart-card {
  background: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  min-height: 400px;
}

.summary-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
}

.summary-box {
  background: #f0f0f0;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  flex: 1 1 calc(50% - 10px);
  min-width: 150px;
}

.summary-box h3 {
  font-size: 16px;
  color: #3E4C59;
  margin-bottom: 10px;
}

.summary-box p {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.chart-wrapper {
  position: relative;
  height: 350px;
  width: 100%;
}
</style>
