# ==============================================================================
# Script de Deploy e Publicação - Oficina Karangos Motor Sport
# ==============================================================================

Write-Host "🏁 Iniciando publicação do Oficina Karangos no GitHub..." -ForegroundColor Cyan

# 1. Verificar status do Git
git status

# 2. Adicionar alterações pendentes
git add .

# 3. Solicitar mensagem de commit se houver modificações
$status = git status --porcelain
if ($status) {
    $commitMsg = Read-Host "Digite a mensagem de commit (ou pressione Enter para 'update: melhorias no site')"
    if ([string]::IsNullOrWhiteSpace($commitMsg)) {
        $commitMsg = "update: melhorias no site"
    }
    git commit -m "$commitMsg"
} else {
    Write-Host "Nenhuma alteração pendente para commit." -ForegroundColor Yellow
}

# 4. Configurar branch main e enviar ao GitHub
git branch -M main
Write-Host "🚀 Enviando commits para https://github.com/anromao/oficina-karangos.git..." -ForegroundColor Green
git push -u origin main

Write-Host "✅ Processo concluído com sucesso!" -ForegroundColor Green
