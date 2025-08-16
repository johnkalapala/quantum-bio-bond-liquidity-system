// Bond market data
const bondData = [
  {
    "transaction_id": 1,
    "date": "2025-08-15",
    "time": "2025-08-15T13:21:13",
    "bond_type": "Corporate A",
    "issuer": "SBI",
    "maturity": "10Y",
    "yield_rate": 9.75,
    "amount_crores": 232.12,
    "volume": 5601,
    "price": 95.64,
    "liquidity_score": 0.37,
    "fraud_risk": 0.27,
    "market_makers": 2,
    "settlement_time": 1.20,
    "quantum_signal": -0.14,
    "bio_optimization_score": 0.73
  },
  {
    "transaction_id": 2,
    "date": "2025-08-15",
    "time": "2025-08-15T15:49:14",
    "bond_type": "Corporate AAA",
    "issuer": "ICICI Bank",
    "maturity": "1Y",
    "yield_rate": 7.32,
    "amount_crores": 169.17,
    "volume": 1026,
    "price": 97.99,
    "liquidity_score": 0.46,
    "fraud_risk": 0.18,
    "market_makers": 5,
    "settlement_time": 21.26,
    "quantum_signal": 1.52,
    "bio_optimization_score": 0.86
  },
  {
    "transaction_id": 3,
    "date": "2025-08-15",
    "time": "2025-08-15T12:26:28",
    "bond_type": "Government",
    "issuer": "Power Grid",
    "maturity": "10Y",
    "yield_rate": 7.88,
    "amount_crores": 269.61,
    "volume": 8345,
    "price": 98.64,
    "liquidity_score": 0.39,
    "fraud_risk": 0.24,
    "market_makers": 6,
    "settlement_time": 5.34,
    "quantum_signal": -0.23,
    "bio_optimization_score": 0.70
  },
  {
    "transaction_id": 4,
    "date": "2025-08-15",
    "time": "2025-08-15T10:35:51",
    "bond_type": "Government",
    "issuer": "SBI",
    "maturity": "30Y",
    "yield_rate": 9.29,
    "amount_crores": 189.26,
    "volume": 7225,
    "price": 102.98,
    "liquidity_score": 0.39,
    "fraud_risk": 0.96,
    "market_makers": 4,
    "settlement_time": 17.90,
    "quantum_signal": 0.77,
    "bio_optimization_score": 0.91
  },
  {
    "transaction_id": 5,
    "date": "2025-08-15",
    "time": "2025-08-15T12:53:18",
    "bond_type": "Government",
    "issuer": "NTPC",
    "maturity": "3Y",
    "yield_rate": 6.77,
    "amount_crores": 167.60,
    "volume": 9857,
    "price": 100.53,
    "liquidity_score": 0.96,
    "fraud_risk": 0.19,
    "market_makers": 7,
    "settlement_time": 21.23,
    "quantum_signal": 0.54,
    "bio_optimization_score": 0.80
  }
];

// Chart colors
const chartColors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B'];

// Global variables
let filteredData = [...bondData];
let charts = {};

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    initializeFilters();
    updateKPIs();
    initializeCharts();
    populateTransactionTable();
    startLiveUpdates();
});

// Tab navigation - Fixed implementation
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Initialize filters - Fixed implementation
function initializeFilters() {
    const bondTypeFilter = document.getElementById('bondTypeFilter');
    const issuerFilter = document.getElementById('issuerFilter');
    const dateFilter = document.getElementById('dateFilter');

    if (bondTypeFilter) {
        bondTypeFilter.addEventListener('change', applyFilters);
    }
    if (issuerFilter) {
        issuerFilter.addEventListener('change', applyFilters);
    }
    if (dateFilter) {
        dateFilter.addEventListener('change', applyFilters);
    }
}

// Apply filters
function applyFilters() {
    const bondTypeFilter = document.getElementById('bondTypeFilter');
    const issuerFilter = document.getElementById('issuerFilter');
    const dateFilter = document.getElementById('dateFilter');

    const bondType = bondTypeFilter ? bondTypeFilter.value : '';
    const issuer = issuerFilter ? issuerFilter.value : '';
    const date = dateFilter ? dateFilter.value : '';

    filteredData = bondData.filter(item => {
        return (!bondType || item.bond_type === bondType) &&
               (!issuer || item.issuer === issuer) &&
               (!date || item.date === date);
    });

    updateKPIs();
    updateCharts();
    populateTransactionTable();
}

// Update KPIs
function updateKPIs() {
    const totalTransactions = filteredData.length;
    const avgLiquidity = totalTransactions > 0 ? filteredData.reduce((sum, item) => sum + item.liquidity_score, 0) / totalTransactions : 0;
    const fraudAlerts = filteredData.filter(item => item.fraud_risk > 0.7).length;
    const marketValue = filteredData.reduce((sum, item) => sum + item.amount_crores, 0);

    const totalElement = document.getElementById('totalTransactions');
    const avgElement = document.getElementById('avgLiquidity');
    const fraudElement = document.getElementById('fraudAlerts');
    const valueElement = document.getElementById('marketValue');

    if (totalElement) totalElement.textContent = totalTransactions;
    if (avgElement) avgElement.textContent = avgLiquidity.toFixed(2);
    if (fraudElement) fraudElement.textContent = fraudAlerts;
    if (valueElement) valueElement.textContent = marketValue.toFixed(2);
}

// Initialize all charts
function initializeCharts() {
    setTimeout(() => {
        initializeMarketHeatmap();
        initializeVolumeChart();
        initializeLiquidityHeatmap();
        initializeCorrelationMatrix();
        initializeRiskDistribution();
        initializeFraudPatterns();
        initializeYieldCurve();
        initializeVolumeTrend();
        initializeSettlementAnalysis();
        initializeMarketMakerChart();
        initializeComplianceChart();
    }, 100);
}

// Market Heatmap
function initializeMarketHeatmap() {
    const canvas = document.getElementById('marketHeatmap');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    const heatmapData = {
        labels: ['Gov 1Y', 'Gov 3Y', 'Gov 10Y', 'Gov 30Y', 'Corp A', 'Corp AAA'],
        datasets: [{
            label: 'Liquidity Score',
            data: [0.8, 0.96, 0.39, 0.39, 0.37, 0.46],
            backgroundColor: chartColors.slice(0, 6),
            borderColor: '#ffffff',
            borderWidth: 2
        }]
    };

    charts.marketHeatmap = new Chart(ctx, {
        type: 'doughnut',
        data: heatmapData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#f5f5f5'
                    }
                }
            }
        }
    });
}

// Volume Chart
function initializeVolumeChart() {
    const canvas = document.getElementById('volumeChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    const bondTypes = [...new Set(bondData.map(item => item.bond_type))];
    const volumeData = bondTypes.map(type => {
        return bondData.filter(item => item.bond_type === type)
                      .reduce((sum, item) => sum + item.volume, 0);
    });

    charts.volumeChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: bondTypes,
            datasets: [{
                label: 'Total Volume',
                data: volumeData,
                backgroundColor: chartColors.slice(0, bondTypes.length),
                borderColor: chartColors.slice(0, bondTypes.length),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#a7a9a9'
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#a7a9a9'
                    }
                }
            }
        }
    });
}

// Liquidity Heatmap
function initializeLiquidityHeatmap() {
    const canvas = document.getElementById('liquidityHeatmap');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    charts.liquidityHeatmap = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Liquidity Heat Signatures',
                data: bondData.map(item => ({
                    x: item.yield_rate,
                    y: item.liquidity_score,
                    r: Math.sqrt(item.volume / 100)
                })),
                backgroundColor: chartColors[0],
                borderColor: chartColors[1]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#f5f5f5'
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Yield Rate (%)',
                        color: '#f5f5f5'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#a7a9a9'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Liquidity Score',
                        color: '#f5f5f5'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#a7a9a9'
                    }
                }
            }
        }
    });
}

// Correlation Matrix
function initializeCorrelationMatrix() {
    const canvas = document.getElementById('correlationMatrix');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    charts.correlationMatrix = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Yield-Liquidity', 'Volume-Price', 'Risk-Settlement', 'Quantum-Bio'],
            datasets: [{
                label: 'Correlation Coefficient',
                data: [-0.65, 0.23, 0.78, 0.42],
                backgroundColor: chartColors.slice(0, 4),
                borderColor: chartColors.slice(0, 4),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    min: -1,
                    max: 1,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#a7a9a9'
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#a7a9a9'
                    }
                }
            }
        }
    });
}

// Risk Distribution
function initializeRiskDistribution() {
    const canvas = document.getElementById('riskDistribution');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    const lowRisk = bondData.filter(item => item.fraud_risk < 0.3).length;
    const mediumRisk = bondData.filter(item => item.fraud_risk >= 0.3 && item.fraud_risk < 0.7).length;
    const highRisk = bondData.filter(item => item.fraud_risk >= 0.7).length;

    charts.riskDistribution = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Low Risk', 'Medium Risk', 'High Risk'],
            datasets: [{
                data: [lowRisk, mediumRisk, highRisk],
                backgroundColor: [chartColors[0], chartColors[1], chartColors[2]],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#f5f5f5'
                    }
                }
            }
        }
    });
}

// Fraud Patterns
function initializeFraudPatterns() {
    const canvas = document.getElementById('fraudPatterns');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    charts.fraudPatterns = new Chart(ctx, {
        type: 'line',
        data: {
            labels: bondData.map(item => item.time.split('T')[1].slice(0, 5)),
            datasets: [{
                label: 'Fraud Risk Score',
                data: bondData.map(item => item.fraud_risk),
                borderColor: chartColors[2],
                backgroundColor: chartColors[2] + '20',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#f5f5f5'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 1,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#a7a9a9'
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#a7a9a9'
                    }
                }
            }
        }
    });
}

// Yield Curve
function initializeYieldCurve() {
    const canvas = document.getElementById('yieldCurve');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    const yieldData = [
        { maturity: '1Y', yield: 7.32 },
        { maturity: '3Y', yield: 6.77 },
        { maturity: '10Y', yield: 8.82 },
        { maturity: '30Y', yield: 9.29 }
    ];

    charts.yieldCurve = new Chart(ctx, {
        type: 'line',
        data: {
            labels: yieldData.map(item => item.maturity),
            datasets: [{
                label: 'Yield Rate (%)',
                data: yieldData.map(item => item.yield),
                borderColor: chartColors[0],
                backgroundColor: chartColors[0] + '20',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#f5f5f5'
                    }
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Yield Rate (%)',
                        color: '#f5f5f5'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#a7a9a9'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Maturity',
                        color: '#f5f5f5'
                    },
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#a7a9a9'
                    }
                }
            }
        }
    });
}

// Volume Trend
function initializeVolumeTrend() {
    const canvas = document.getElementById('volumeTrend');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    charts.volumeTrend = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: bondData.map(item => item.time.split('T')[1].slice(0, 5)),
            datasets: [{
                label: 'Trading Volume',
                data: bondData.map(item => item.volume),
                backgroundColor: chartColors[1],
                borderColor: chartColors[1],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#f5f5f5'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#a7a9a9'
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#a7a9a9'
                    }
                }
            }
        }
    });
}

// Settlement Analysis
function initializeSettlementAnalysis() {
    const canvas = document.getElementById('settlementAnalysis');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    charts.settlementAnalysis = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Settlement Time vs Volume',
                data: bondData.map(item => ({
                    x: item.volume,
                    y: item.settlement_time
                })),
                backgroundColor: chartColors[3],
                borderColor: chartColors[4],
                pointRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#f5f5f5'
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Trading Volume',
                        color: '#f5f5f5'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#a7a9a9'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Settlement Time (hours)',
                        color: '#f5f5f5'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#a7a9a9'
                    }
                }
            }
        }
    });
}

// Market Maker Chart
function initializeMarketMakerChart() {
    const canvas = document.getElementById('marketMakerChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    charts.marketMakerChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: bondData.map(item => `${item.bond_type} - ${item.issuer}`),
            datasets: [{
                label: 'Market Makers',
                data: bondData.map(item => item.market_makers),
                backgroundColor: chartColors,
                borderColor: '#ffffff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#f5f5f5'
                    }
                }
            }
        }
    });
}

// Compliance Chart
function initializeComplianceChart() {
    const canvas = document.getElementById('complianceChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    charts.complianceChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Compliant', 'Under Review', 'Non-Compliant', 'Pending'],
            datasets: [{
                label: 'Transaction Count',
                data: [4, 1, 0, 0],
                backgroundColor: [chartColors[0], chartColors[1], chartColors[2], chartColors[3]],
                borderColor: [chartColors[0], chartColors[1], chartColors[2], chartColors[3]],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#a7a9a9'
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#a7a9a9'
                    }
                }
            }
        }
    });
}

// Update all charts with filtered data
function updateCharts() {
    Object.values(charts).forEach(chart => {
        if (chart && typeof chart.update === 'function') {
            chart.update();
        }
    });
}

// Populate transaction table
function populateTransactionTable() {
    const tbody = document.getElementById('transactionTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';

    filteredData.forEach(transaction => {
        const row = document.createElement('tr');
        const riskClass = transaction.fraud_risk > 0.7 ? 'risk-high' : 
                         transaction.fraud_risk > 0.3 ? 'risk-medium' : 'risk-low';
        
        row.innerHTML = `
            <td>${transaction.transaction_id}</td>
            <td>${transaction.time.split('T')[1].slice(0, 8)}</td>
            <td>${transaction.bond_type}</td>
            <td>${transaction.issuer}</td>
            <td>₹${transaction.amount_crores.toFixed(2)}</td>
            <td class="${riskClass}">${(transaction.fraud_risk * 100).toFixed(1)}%</td>
            <td>
                <button class="btn btn--sm btn--outline" onclick="viewTransaction(${transaction.transaction_id})">View</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// View transaction details - Fixed implementation
function viewTransaction(transactionId) {
    const transaction = bondData.find(t => t.transaction_id === transactionId);
    if (!transaction) return;

    const modalBody = document.getElementById('transactionDetails');
    if (!modalBody) return;
    
    modalBody.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div>
                <strong>Transaction ID:</strong> ${transaction.transaction_id}<br>
                <strong>Date & Time:</strong> ${transaction.time}<br>
                <strong>Bond Type:</strong> ${transaction.bond_type}<br>
                <strong>Issuer:</strong> ${transaction.issuer}<br>
                <strong>Maturity:</strong> ${transaction.maturity}<br>
                <strong>Yield Rate:</strong> ${transaction.yield_rate}%
            </div>
            <div>
                <strong>Amount:</strong> ₹${transaction.amount_crores} Cr<br>
                <strong>Volume:</strong> ${transaction.volume.toLocaleString()}<br>
                <strong>Price:</strong> ₹${transaction.price}<br>
                <strong>Liquidity Score:</strong> ${transaction.liquidity_score}<br>
                <strong>Fraud Risk:</strong> ${(transaction.fraud_risk * 100).toFixed(1)}%<br>
                <strong>Market Makers:</strong> ${transaction.market_makers}
            </div>
        </div>
        <div style="margin-top: 16px;">
            <strong>Quantum Signal:</strong> ${transaction.quantum_signal}<br>
            <strong>Bio-Optimization Score:</strong> ${transaction.bio_optimization_score}<br>
            <strong>Settlement Time:</strong> ${transaction.settlement_time} hours
        </div>
    `;

    const modal = document.getElementById('transactionModal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

// Close modal - Fixed implementation
function closeModal() {
    const modal = document.getElementById('transactionModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Dismiss alert - Fixed implementation  
function dismissAlert(alertId) {
    const alert = document.querySelector(`[data-alert-id="${alertId}"]`);
    if (alert) {
        alert.remove();
        updateAlertCount();
    }
}

// Update alert count
function updateAlertCount() {
    const alertCount = document.querySelectorAll('.alert').length;
    const alertCountElement = document.getElementById('alertCount');
    if (alertCountElement) {
        alertCountElement.textContent = `${alertCount} Alert${alertCount !== 1 ? 's' : ''}`;
    }
}

// Export report functionality
document.addEventListener('DOMContentLoaded', function() {
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            const reportData = {
                timestamp: new Date().toISOString(),
                totalTransactions: filteredData.length,
                avgLiquidity: filteredData.reduce((sum, item) => sum + item.liquidity_score, 0) / filteredData.length,
                fraudAlerts: filteredData.filter(item => item.fraud_risk > 0.7).length,
                marketValue: filteredData.reduce((sum, item) => sum + item.amount_crores, 0),
                transactions: filteredData
            };

            const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `bond_market_report_${new Date().toISOString().slice(0, 10)}.json`;
            a.click();
            URL.revokeObjectURL(url);
        });
    }
});

// Start live updates simulation
function startLiveUpdates() {
    setInterval(() => {
        // Simulate live data updates
        const randomIndex = Math.floor(Math.random() * bondData.length);
        const randomTransaction = bondData[randomIndex];
        
        // Slightly modify some values to simulate live updates
        randomTransaction.price += (Math.random() - 0.5) * 0.1;
        randomTransaction.liquidity_score = Math.max(0, Math.min(1, randomTransaction.liquidity_score + (Math.random() - 0.5) * 0.05));
        
        // Update KPIs and charts
        updateKPIs();
        updateCharts();
        
        // Add visual feedback for updates
        const kpiGrid = document.querySelector('.kpi-grid');
        if (kpiGrid) {
            kpiGrid.classList.add('updating');
            setTimeout(() => {
                kpiGrid.classList.remove('updating');
            }, 1000);
        }
    }, 10000); // Update every 10 seconds
}

// Close modal on outside click
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('transactionModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    }
});

// Make functions globally available
window.viewTransaction = viewTransaction;
window.closeModal = closeModal;
window.dismissAlert = dismissAlert;