/* eslint-disable react/jsx-no-undef */
'use client';
import { useState } from 'react';
import { planets } from '@/features/planets/data/planets'; 
import { select } from 'three/tsl';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { VisibilityBufferDrawingPipeline } from 'three/examples/jsm/pipelines/VisibilityBufferDrawingPipeline.js';
import { plane } from 'three/examples/jsm/Addons.js';

export default function PlanetViewer({ planet }: { planet: Planet }) {
  return (
    <div className="h-80 w-full overflow-hidden rounded-box">
      <Canvas camera={{ position: [0, 1, planet.size * 4 + 2], fov: 50 }}>
        <color attach="background" args={["#05060f"]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 3, 5]} intensity={2.5} />
        <Stars radius={50} depth={30} count={1500} factor={3} fade />
        <Spinner planet={planet} />
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
    </div>
  );
}

export default function SolarSystemScene({ planets }: { visiblePlanet: VisibilityBufferDrawingPipeline }) {
  return (
    <div className="mx-auto flex h-[90vh] max-w-6xl overflow-hidden rounded-2xl bg-white shadow-xl">
                <aside className="w-1/3 border-r border-slate-200">
                    <div className="flex items-center justify-between bg-emerald-600 p-5 text-white">
                        <h1 className="text-xl font-bold">WhatsApp</h1>
                        <button onClick={() => setShowProfile(!showProfile)}>Profile</button>
                    </div>

                    {SolarSystemScene && (
                        <div className="border-b bg-emerald-50 p-4">
                            <h2 className="font-bold">My Profile</h2>
                            <p className="text-sm">Available</p>
                            <button className="mt-2 text-sm text-emerald-700" onClick={() => setPlanets(false)}>
                                Close
                            </button>
                        </div>
                    )}

                    <div className="p-3">
                        <input
                            className="w-full rounded-lg bg-slate-100 p-3 outline-none"
                            placeholder="Search conversations..."
                        />
                    </div>

                    {planets.map((planet) => (
                        <button
                            key={planet.id}
                            onClick={() => setSelectedId(planet.id)}
                            className={`w-full border-b p-4 text-left hover:bg-slate-100 ${
                                selectedId === planet.id ? 'bg-emerald-50' : ''
                            }`}
                        >
                            <h2 className="font-semibold">{planet.name}</h2>
                            <p className="text-sm text-slate-500">{planet.type}</p>
                            <p className="truncate text-sm text-slate-400">
                            </p>
                        </button>
                    ))}
                </aside>

                <section className="flex flex-1 flex-col">
                    {selectedChat && (
                        <>
                            <header className="border-b bg-slate-50 p-5">
                                <h2 className="text-lg font-bold">{selectedChat.name}</h2>
                                <p className="text-sm text-slate-500">{selectedChat.status}</p>
                            </header>

                            <div className="flex flex-1 flex-col gap-3 overflow-y-auto bg-slate-100 p-6">
                                {selectedChat.messages.map((msg: Message) => (
                                    <div
                                        key={msg.id}
                                        className={`max-w-[70%] rounded-xl p-3 shadow-sm ${
                                            msg.sender === 'me' ? 'self-end bg-emerald-200' : 'self-start bg-white'
                                        }`}
                                    >
                                        <p>{msg.text}</p>
                                        <span className="mt-1 block text-right text-xs text-slate-500">{msg.time}</span>
                                    </div>
                                ))}
                            </div>

                            <form
                                className="flex gap-3 border-t bg-white p-4"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    sendMessage();
                                }}
                            >
                                <input
                                    className="flex-1 rounded-full bg-slate-100 px-5 py-3 outline-none"
                                    placeholder="Type a message..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className="rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
                                >
                                    Send
                                </button>
                            </form>
                        </>
                    )}
                </section>
            </div>

  );
  
}

