export default class LoanCalculator {
  calculateMonthlyInstallment(
    principal: number,
    interestRate: number,
    duration: number
  ): number {
    const annualInterest = principal * (interestRate / 100); // Bunga per tahun
    const totalInterest = (annualInterest / 12) * duration; // Total bunga selama durasi pinjaman
    const totalAmount = principal + totalInterest; // Total jumlah yang harus dibayar
    return totalAmount / duration; // Angsuran per bulan
  }
}
