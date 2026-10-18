export function formatRupiah(amount: number): string {
  return `Rp ${amount.toLocaleString('id-ID')}`;
}

export function validateNik(nik: string): { isValid: boolean; message?: string } {
  const trimmed = nik.trim();
  if (trimmed.length !== 16) {
    return { isValid: false, message: 'NIK harus terdiri dari tepat 16 digit angka.' };
  }
  if (!/^\d{16}$/.test(trimmed)) {
    return { isValid: false, message: 'NIK hanya boleh memuat angka 0-9.' };
  }
  return { isValid: true };
}

export function calculateResolutionRate(total: number, completed: number): number {
  if (total <= 0) return 100;
  return Math.min(100, Math.max(0, Math.round((completed / total) * 100)));
}

export function calculateBudgetPortions(total: number) {
  return {
    pjuCctv: Math.round(total * 0.35),
    kebersihan: Math.round(total * 0.30),
    sosial: Math.round(total * 0.20),
    cadangan: Math.round(total * 0.15),
  };
}
