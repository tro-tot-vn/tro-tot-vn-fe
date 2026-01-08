import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { ThumbsUp, ThumbsDown, X } from 'lucide-react';
import { toast } from 'sonner';
import { axios_auth } from '@/config/axios-auth';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:6969";

interface SearchFeedbackWidgetProps {
    searchLogId: number;
    onDismiss?: () => void;
}

const FEEDBACK_ISSUES = [
    { id: 'wrong_location', label: 'Sai khu vực' },
    { id: 'irrelevant', label: 'Kết quả không liên quan' },
    { id: 'wrong_price', label: 'Giá không phù hợp' },
    { id: 'outdated', label: 'Thông tin lỗi thời' },
];

export function SearchFeedbackWidget({ searchLogId, onDismiss }: SearchFeedbackWidgetProps) {
    const [showDetailedForm, setShowDetailedForm] = useState(false);
    const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleQuickFeedback = async (isHelpful: boolean) => {
        if (isHelpful) {
            // Submit positive feedback immediately
            await submitFeedback(true, [], '');
        } else {
            // Show detailed form for negative feedback
            setShowDetailedForm(true);
        }
    };

    const submitFeedback = async (isHelpful: boolean, issues: string[], feedbackComment: string) => {
        setSubmitting(true);
        try {
            await axios_auth.post('/api/search/feedback', {
                searchLogId,
                isHelpful,
                issues: issues.length > 0 ? issues : undefined,
                comment: feedbackComment || undefined,
            });

            toast.success('Cảm ơn phản hồi của bạn!');
            setSubmitted(true);

            // Auto-dismiss after 2 seconds
            setTimeout(() => {
                onDismiss?.();
            }, 2000);
        } catch (error) {
            console.error('Failed to submit feedback:', error);
            toast.error('Không thể gửi phản hồi. Vui lòng thử lại.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDetailedSubmit = async () => {
        await submitFeedback(false, selectedIssues, comment);
    };

    const toggleIssue = (issueId: string) => {
        setSelectedIssues(prev =>
            prev.includes(issueId)
                ? prev.filter(id => id !== issueId)
                : [...prev, issueId]
        );
    };

    if (submitted) {
        return (
            <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4 text-center">
                    <p className="text-green-700 font-medium">✓ Đã ghi nhận phản hồi của bạn!</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="border-[#ff6d0b]/20">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-medium">
                        Kết quả tìm kiếm có hữu ích không?
                    </CardTitle>
                    {onDismiss && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={onDismiss}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {!showDetailedForm ? (
                    <div className="flex gap-3 justify-center">
                        <Button
                            onClick={() => handleQuickFeedback(true)}
                            disabled={submitting}
                            className="bg-green-500 hover:bg-green-600 text-white gap-2"
                        >
                            <ThumbsUp className="h-4 w-4" />
                            Có
                        </Button>
                        <Button
                            onClick={() => handleQuickFeedback(false)}
                            disabled={submitting}
                            variant="outline"
                            className="gap-2 border-red-200 hover:bg-red-50 hover:text-red-700"
                        >
                            <ThumbsDown className="h-4 w-4" />
                            Không
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm font-medium mb-2">Vấn đề bạn gặp phải:</p>
                            <div className="space-y-2">
                                {FEEDBACK_ISSUES.map(issue => (
                                    <div key={issue.id} className="flex items-center gap-2">
                                        <Checkbox
                                            id={issue.id}
                                            checked={selectedIssues.includes(issue.id)}
                                            onCheckedChange={() => toggleIssue(issue.id)}
                                        />
                                        <label
                                            htmlFor={issue.id}
                                            className="text-sm cursor-pointer select-none"
                                        >
                                            {issue.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium mb-2 block">
                                Góp ý khác (tùy chọn):
                            </label>
                            <Textarea
                                placeholder="Cho chúng tôi biết thêm..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                rows={3}
                                className="resize-none"
                            />
                        </div>

                        <div className="flex gap-2">
                            <Button
                                onClick={handleDetailedSubmit}
                                disabled={submitting}
                                className="flex-1 bg-[#ff6d0b] hover:bg-[#ff6d0b]/90"
                            >
                                {submitting ? 'Đang gửi...' : 'Gửi phản hồi'}
                            </Button>
                            <Button
                                onClick={() => setShowDetailedForm(false)}
                                disabled={submitting}
                                variant="outline"
                            >
                                Hủy
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
