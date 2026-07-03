import prisma from '../config/prisma.js';

export const addKategori = async ({ namaKategori, status }) => {
    if (!namaKategori?.trim()) {
        throw new Error('Nama Kategori Wajib di isi');
    }

    const existingKategori = await prisma.kategori.findFirst({
        where: {
            namaKategori,
        },
    });

    if (existingKategori) {
        throw new Error('Nama Kategori Sudah Ada');
    }

    const newKategori = await prisma.kategori.create({
        data: {
            namaKategori: namaKategori,
            ...(status && { status }),
        },
    });

    return newKategori;
};

export const getAllKategori = async () => {
    const result = await prisma.kategori.findMany({
        select: {
            id: true,
            namaKategori: true,
            status: true,
        },
    });

    return result;
};

export const updateKategori = async (id, { namaKategori, status }) => {
    const existingKategori = await prisma.kategori.findUnique({
        where: { id },
    });

    if (!existingKategori) {
        throw new Error('Kategori Tidak Ditemukan');
    }

    const data = {};
    if (namaKategori) {
        data.namaKategori = namaKategori;
    }
    if (status) {
        data.status = status;
    }

    const update = await prisma.kategori.update({
        where: { id },
        data,
        select: {
            id: true,
            namaKategori: true,
            status: true,
        },
    });

    return update;
};

export const deleteKategori = async (id) => {
    const existingKategori = await prisma.kategori.findFirst({
        where: {
            namaKategori,
        },
    });

    if (!existingKategori) {
        throw new Error('Nama Kategori Tidak Ditemukan');
    }
    const remove = await prisma.kategori.delete({
        where: { id },
    });

    return remove;
};
