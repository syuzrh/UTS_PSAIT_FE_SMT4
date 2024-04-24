"use client";

import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios(
                    "http://127.0.0.1:8000/api/nilai-mahasiswa"
                );
                const sortedData = result.data.sort((a, b) => {
                    if (a.nim < b.nim) {
                        return -1;
                    }
                    if (a.nim > b.nim) {
                        return 1;
                    }
                    if (a.kode_mk < b.kode_mk) {
                        return -1;
                    }
                    if (a.kode_mk > b.kode_mk) {
                        return 1;
                    }
                    return 0;
                });
                setData(sortedData);
            } catch (error) {
                console.error("Failed to fetch data: ", error);
            }
        };

        fetchData();
    }, []);

    const deleteData = async (nim, kode_mk) => {
        try {
            await axios.delete(
                `http://127.0.0.1:8000/api/delete-nilai-mahasiswa/${nim}/${kode_mk}`
            );

            fetchData();
        } catch (error) {
            console.error("Failed to delete data: ", error);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white text-black">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex justify-end mb-4">
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Tambah Nilai
                    </button>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                NIM
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nama Mahasiswa
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Alamat
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tanggal Lahir
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Kode Mata Kuliah
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nama Mata Kuliah
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Jumlah SKS
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nilai
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr
                                key={index}
                                className="bg-white border-b hover:bg-gray-50"
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                >
                                    {item.nim}
                                </th>
                                <td className="px-6 py-4">{item.nama}</td>
                                <td className="px-6 py-4">{item.alamat}</td>
                                <td className="px-6 py-4">
                                    {item.tanggal_lahir}
                                </td>
                                <td className="px-6 py-4">{item.kode_mk}</td>
                                <td className="px-6 py-4">{item.nama_mk}</td>
                                <td className="px-6 py-4">{item.sks}</td>
                                <td className="px-6 py-4">{item.nilai}</td>
                                <td className="px-6 py-4 text-right">
                                    <Link
                                        className="bg-blue-100 text-blue-600 hover:text-blue-900 px-2 py-1 rounded"
                                        href={`/edit/${item.id_perkuliahan}`}
                                    >
                                        Edit
                                    </Link>
                                    <a
                                        href="#"
                                        className="font-medium text-red-600 hover:underline bg-red-100 px-2 py-1 rounded ml-2"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            deleteData(item.nim, item.kode_mk);
                                        }}
                                    >
                                        Delete
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}
