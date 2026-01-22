import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import { toast } from "sonner";

interface AddReviewDialogProps {
  productId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  language?: "pt" | "en";
}

const translations = {
  pt: {
    title: "Escrever Avaliação",
    description: "Compartilhe sua experiência com este produto",
    loginRequired: "Você precisa fazer login para avaliar produtos",
    login: "Fazer Login",
    rating: "Avaliação",
    selectRating: "Selecione uma avaliação",
    reviewTitle: "Título (opcional)",
    titlePlaceholder: "Resuma sua experiência",
    comment: "Comentário",
    commentPlaceholder: "Conte-nos mais sobre sua experiência com este produto (mínimo 10 caracteres)",
    submit: "Enviar Avaliação",
    submitting: "Enviando...",
    success: "Avaliação enviada com sucesso!",
    error: "Erro ao enviar avaliação. Tente novamente.",
    cancel: "Cancelar",
  },
  en: {
    title: "Write Review",
    description: "Share your experience with this product",
    loginRequired: "You need to login to review products",
    login: "Login",
    rating: "Rating",
    selectRating: "Select a rating",
    reviewTitle: "Title (optional)",
    titlePlaceholder: "Summarize your experience",
    comment: "Comment",
    commentPlaceholder: "Tell us more about your experience with this product (minimum 10 characters)",
    submit: "Submit Review",
    submitting: "Submitting...",
    success: "Review submitted successfully!",
    error: "Error submitting review. Please try again.",
    cancel: "Cancel",
  },
};

export function AddReviewDialog({
  productId,
  open,
  onOpenChange,
  language = "en",
}: AddReviewDialogProps) {
  const t = translations[language];
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  
  const utils = trpc.useUtils();
  const createReviewMutation = trpc.reviews.createReview.useMutation({
    onSuccess: () => {
      toast.success(t.success);
      utils.reviews.getProductReviews.invalidate({ productId });
      utils.reviews.getProductRatingStats.invalidate({ productId });
      onOpenChange(false);
      // Reset form
      setRating(0);
      setTitle("");
      setComment("");
    },
    onError: () => {
      toast.error(t.error);
    },
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!rating) {
      toast.error(t.selectRating);
      return;
    }
    
    if (comment.length < 10) {
      toast.error(language === "pt" ? "Comentário muito curto" : "Comment too short");
      return;
    }
    
    createReviewMutation.mutate({
      productId,
      rating,
      title: title || undefined,
      comment,
    });
  };
  
  if (!user) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.title}</DialogTitle>
            <DialogDescription>{t.loginRequired}</DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-4">
            <Button asChild className="gradient-accent text-accent-foreground">
              <a href={getLoginUrl()}>
                {t.login}
              </a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t.title}</DialogTitle>
          <DialogDescription>{t.description}</DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating Stars */}
          <div className="space-y-2">
            <Label>{t.rating}</Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoveredRating || rating)
                        ? "fill-accent text-accent"
                        : "text-muted-foreground/30"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">{t.reviewTitle}</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t.titlePlaceholder}
              maxLength={255}
            />
          </div>
          
          {/* Comment */}
          <div className="space-y-2">
            <Label htmlFor="comment">{t.comment}</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={t.commentPlaceholder}
              rows={5}
              required
              minLength={10}
            />
            <p className="text-xs text-muted-foreground">
              {comment.length}/500 {language === "pt" ? "caracteres" : "characters"}
            </p>
          </div>
          
          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={createReviewMutation.isPending}
            >
              {t.cancel}
            </Button>
            <Button
              type="submit"
              disabled={createReviewMutation.isPending || !rating || comment.length < 10}
              className="gradient-accent text-accent-foreground"
            >
              {createReviewMutation.isPending ? t.submitting : t.submit}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
