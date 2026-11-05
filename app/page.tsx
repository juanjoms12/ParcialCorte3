'use client';
import { useState } from 'react';
import { planets } from '@/features/planets/data/planets'; 
import { select } from 'three/tsl';

export default function HomePage() {

  const [planets, setPlanet] = useState("");
  

    function SolarSystemScene() {
        if (!planets.trim() || !select) return;

    }

  return <h1>Home</h1>;
  <SolarSystemScene></SolarSystemScene>

          <main className="min-h-screen bg-slate-100 p-4 text-slate-800">
            <div className="mx-auto flex h-[90vh] max-w-6xl overflow-hidden rounded-2xl bg-white shadow-xl">
                <aside className="w-1/3 border-r border-slate-200">
                    <div className="flex items-center justify-between bg-emerald-600 p-5 text-white">

                              <main className="min-h-screen bg-slate-100 p-4 text-slate-800">
            <div className="mx-auto flex h-[90vh] max-w-6xl overflow-hidden rounded-2xl bg-white shadow-xl">
                <aside className="w-1/3 border-r border-slate-200">
                    <div className="flex items-center justify-between bg-emerald-600 p-5 text-white">


} 
