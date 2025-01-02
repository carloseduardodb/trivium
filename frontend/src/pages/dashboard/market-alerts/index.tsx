import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Save, Mail } from "lucide-react";

interface AlertSettings {
  email: string;
  enableEmail: boolean;
  telegramBotToken: string;
  telegramChatId: string;
  enableTelegram: boolean;
}

export const MarketAlerts = () => {
  const [settings, setSettings] = useState<AlertSettings>({
    email: "",
    enableEmail: false,
    telegramBotToken: "",
    telegramChatId: "",
    enableTelegram: false,
  });

  const [saveStatus, setSaveStatus] = useState<{
    show: boolean;
    success: boolean;
    message: string;
  }>({
    show: false,
    success: false,
    message: "",
  });

  const handleSave = () => {
    setSaveStatus({
      show: true,
      success: true,
      message: "Configurações salvas com sucesso!",
    });

    setTimeout(() => {
      setSaveStatus((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  return (
    <div className="bg-black p-8 w-full text-white">
      <h1 className="text-2xl md:text-3xl font-bold text-white">
        Configurações de Alertas de Mercado
      </h1>
      <br />
      <Card className="bg-[#1e1e1e] border-none text-white pt-5">
        <CardContent className="space-y-6">
          {/* Seção de Email */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <h3 className="text-lg font-semibold">
                  Configurações de Email
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.enableEmail}
                  onCheckedChange={(checked) =>
                    setSettings((prev) => ({ ...prev, enableEmail: checked }))
                  }
                />
                <Label>Ativar alertas por email</Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email para receber alertas</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={settings.email}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, email: e.target.value }))
                }
                disabled={!settings.enableEmail}
              />
            </div>
          </div>

          {/* Seção do Telegram */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <img src="/telegram.svg" className="h-5 w-5" />
                <h3 className="text-lg font-semibold">
                  Configurações do Telegram
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={settings.enableTelegram}
                  onCheckedChange={(checked) =>
                    setSettings((prev) => ({
                      ...prev,
                      enableTelegram: checked,
                    }))
                  }
                />
                <Label>Ativar alertas no Telegram</Label>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="botToken">Token do Bot</Label>
                <Input
                  id="botToken"
                  type="password"
                  placeholder="Digite o token do seu bot"
                  value={settings.telegramBotToken}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      telegramBotToken: e.target.value,
                    }))
                  }
                  disabled={!settings.enableTelegram}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="chatId">Chat ID</Label>
                <Input
                  id="chatId"
                  placeholder="Digite o Chat ID"
                  value={settings.telegramChatId}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      telegramChatId: e.target.value,
                    }))
                  }
                  disabled={!settings.enableTelegram}
                />
              </div>
            </div>
          </div>

          {saveStatus.show && (
            <Alert className={saveStatus.success ? "bg-green-50" : "bg-red-50"}>
              <AlertDescription>{saveStatus.message}</AlertDescription>
            </Alert>
          )}
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button
            onClick={handleSave}
            className="bg-purple-900 hover:bg-purple-800"
          >
            <Save className="mr-2 h-4 w-4" />
            Salvar Configurações
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
