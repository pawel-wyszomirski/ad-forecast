import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const UpdatedParetoForecast = () => {
  const dailyData = [
    {
      day: '4 listopada (real)',
      wydatki: 113.67,
      przychody: 57.12,
      sprzedaze: 5,
      cpc: 1.72,
      koszt_sprzedazy: 22.73,
      roas: 0.50
    },
    {
      day: '5 listopada',
      wydatki: 110,
      przychody: 142.90, // Wzrost dzięki optymalizacji Pareto
      sprzedaze: 7,
      cpc: 1.45,
      koszt_sprzedazy: 15.71,
      roas: 1.30
    },
    {
      day: '6 listopada',
      wydatki: 110,
      przychody: 171.48, // Dalszy wzrost
      sprzedaze: 8,
      cpc: 1.35,
      koszt_sprzedazy: 13.75,
      roas: 1.56
    },
    {
      day: '7 listopada',
      wydatki: 110,
      przychody: 199.98, // Stabilizacja po optymalizacji
      sprzedaze: 9,
      cpc: 1.30,
      koszt_sprzedazy: 12.22,
      roas: 1.82
    }
  ];

  const budgetDistribution = [
    {
      kreacja: "AI na stres",
      budzet: 60,
      prognoza_sprzedazy: "3-4",
      spodziewany_cpc: "1.05-1.15"
    },
    {
      kreacja: "Prokrastynacja",
      budzet: 40,
      prognoza_sprzedazy: "2-3",
      spodziewany_cpc: "1.80-2.00"
    },
    {
      kreacja: "Słoik",
      budzet: 10,
      prognoza_sprzedazy: "0-1",
      spodziewany_cpc: "2.20-2.40"
    }
  ];

  const totalData = {
    wydatki: dailyData.reduce((sum, day) => sum + day.wydatki, 0),
    przychody: dailyData.reduce((sum, day) => sum + day.przychody, 0),
    sprzedaze: dailyData.reduce((sum, day) => sum + day.sprzedaze, 0)
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Prognoza po optymalizacji Pareto - 4-7 listopada</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Wykres Wydatki vs Przychody */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="wydatki" stroke="#ef4444" name="Wydatki (PLN)" />
                <Line type="monotone" dataKey="przychody" stroke="#22c55e" name="Przychody (PLN)" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Wykres Sprzedaży i ROAS */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="sprzedaze" stroke="#3b82f6" name="Liczba sprzedaży" />
                <Line yAxisId="right" type="monotone" dataKey="roas" stroke="#f97316" name="ROAS" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Nowy rozkład budżetu */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {budgetDistribution.map((item, index) => (
              <Card key={index} className="p-4">
                <h3 className="font-semibold mb-2">{item.kreacja}</h3>
                <div className="text-sm space-y-2">
                  <p className="flex justify-between">
                    <span>Budżet:</span>
                    <span className="font-medium">{item.budzet} PLN</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Prognoza sprzedaży:</span>
                    <span className="font-medium">{item.prognoza_sprzedazy}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Spodziewany CPC:</span>
                    <span className="font-medium">{item.spodziewany_cpc} PLN</span>
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {/* Podsumowanie 4 dni */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 bg-gray-50">
              <h3 className="text-lg font-semibold mb-2">Łączne wydatki</h3>
              <p className="text-2xl text-red-500">{totalData.wydatki.toFixed(2)} PLN</p>
            </Card>
            <Card className="p-4 bg-gray-50">
              <h3 className="text-lg font-semibold mb-2">Łączne przychody</h3>
              <p className="text-2xl text-green-500">{totalData.przychody.toFixed(2)} PLN</p>
            </Card>
            <Card className="p-4 bg-gray-50">
              <h3 className="text-lg font-semibold mb-2">Całkowita sprzedaż</h3>
              <p className="text-2xl text-blue-500">{totalData.sprzedaze}</p>
            </Card>
          </div>

          {/* Założenia prognozy */}
          <Card className="p-4 bg-blue-50">
            <h3 className="font-semibold mb-2">Kluczowe założenia prognozy:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Zwiększenie budżetu "AI na stres" do 60 PLN przyniesie proporcjonalny wzrost sprzedaży</li>
              <li>Zatrzymanie nieefektywnej kreacji "Wideo" uwolni budżet na lepiej konwertujące reklamy</li>
              <li>Optymalizacja CPC o około 15-20% w ciągu kolejnych dni</li>
              <li>Stabilny wzrost ROAS dzięki lepszej alokacji budżetu</li>
            </ul>
          </Card>

          {/* KPI i cele */}
          <Card className="p-4 bg-green-50">
            <h3 className="font-semibold mb-2">Kluczowe cele do osiągnięcia:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="font-medium">Docelowy ROAS</p>
                <p className="text-lg">1.82</p>
              </div>
              <div>
                <p className="font-medium">Średni CPC</p>
                <p className="text-lg">1.30 PLN</p>
              </div>
              <div>
                <p className="font-medium">Dzienna sprzedaż</p>
                <p className="text-lg">8-9 szt</p>
              </div>
              <div>
                <p className="font-medium">Koszt sprzedaży</p>
                <p className="text-lg">12.22 PLN</p>
              </div>
            </div>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpdatedParetoForecast;